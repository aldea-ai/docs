import fs from "node:fs";
import path from "node:path";

/**
 * Fumadocs POC — One MDX per header
 * ----------------------------------
 * - Reads each .h file in /headers
 * - Extracts:
 *   (A) docblock + prototype pairs  /** ... *\/  ret name(args);
 *   (B) bare prototypes (no docblock)
 * - Emits ONE file per header: content/docs/api-reference/<HeaderBase>.mdx
 * - Exits non-zero if no headers or no functions found.
 */

const HEADERS_DIR = path.resolve("headers");
const OUT_DIR = path.resolve("content/docs/api-reference");

// docblock + prototype (group1 = docblock body, group2 = prototype)
const BLOCK =
  /\/\*\*([\s\S]*?)\*\/\s*([a-zA-Z_][\w\s\*\&]+?\([^;{]*\)\s*;)/g;

// bare prototypes (skip typedef/struct/enum/preproc/comments)
const PROTO =
  /^(?!\s*(typedef|struct|enum|#)|\s*\/\*|\s*\*|\s*\/\/)([a-zA-Z_][\w\s\*\&]+?\([^;{]*\)\s*;)\s*$/gm;

type Doc = {
  brief?: string;
  description?: string;
  params: { name: string; desc: string }[];
  returns?: string;
  errors: string[];
  example?: string;
  since?: string;
};

type FnEntry = {
  name: string;
  signature: string;
  doc?: Doc;           // present if docblock found
  fromDocblock: boolean;
};

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function mdEscape(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function funcName(signature: string) {
  return (signature.match(/\b([a-zA-Z_]\w*)\s*\(/)?.[1]) ?? "function";
}

function slugify(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function parseDocblock(raw: string): Doc {
  const lines = raw.split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim());
  const doc: Doc = { params: [], errors: [] };
  const prose: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("@brief")) {
      doc.brief = line.replace("@brief", "").trim();
    } else if (line.startsWith("@param")) {
      const m = line.match(/@param\s+(\w+)\s+(.*)$/);
      if (m) doc.params.push({ name: m[1], desc: m[2] });
    } else if (line.startsWith("@return") || line.startsWith("@returns")) {
      doc.returns = line.replace(/@returns?/, "").trim();
    } else if (line.startsWith("@error")) {
      doc.errors.push(line.replace("@error", "").trim());
    } else if (line.startsWith("@since")) {
      doc.since = line.replace("@since", "").trim();
    } else if (line.startsWith("@example")) {
      const ex: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("@")) {
        ex.push(lines[i]);
        i++;
      }
      i--;
      const exText = ex.join("\n").trim();
      if (exText) doc.example = exText;
    } else if (!line.startsWith("@")) {
      if (line) prose.push(line);
    }
  }

  const text = prose.join("\n").trim();
  if (text) doc.description = text;

  return doc;
}

function renderHeaderPage(headerBase: string, fns: FnEntry[]) {
  const title = headerBase;
  const fm = `---\ntitle: ${title}\n---\n\n`;
  const intro = `> This page is **auto-generated** from \`/headers/${headerBase}.h\`. Edit doc comments in the header and rebuild to update.\n\n`;

  // TOC
  const tocLines: string[] = [];
  tocLines.push("## Functions");
  for (const fn of fns) {
    const id = slugify(fn.name);
    tocLines.push(`- [\`${fn.name}\`](#${id})`);
  }
  tocLines.push("");

  // Sections
  const sections: string[] = [];
  for (const fn of fns) {
    const id = slugify(fn.name);
    sections.push(`<a id="${id}"></a>`);
    sections.push(`### \`${fn.name}\``);
    if (!fn.fromDocblock) {
      sections.push("> ⚠️ No doc comment found. Add a `/** ... */` block above this prototype in the header to include description, parameters, returns, and examples.\n");
    }

    // brief/description
    if (fn.doc?.brief) sections.push(fn.doc.brief + "\n");
    if (fn.doc?.description) sections.push(fn.doc.description + "\n");

    // signature
    sections.push("**Signature**");
    sections.push("```c");
    sections.push(fn.signature.trim());
    sections.push("```");

    // params table
    if (fn.doc && fn.doc.params.length) {
      sections.push("\n**Parameters**");
      sections.push("");
      sections.push("| Name | Description |");
      sections.push("|------|-------------|");
      for (const p of fn.doc.params) {
        sections.push(`| \`${p.name}\` | ${p.desc} |`);
      }
    }

    if (fn.doc?.returns) {
      sections.push("\n**Returns**");
      sections.push("");
      sections.push(fn.doc.returns);
    }

    if (fn.doc && fn.doc.errors.length) {
      sections.push("\n**Errors**");
      for (const e of fn.doc.errors) sections.push(`- ${e}`);
    }

    if (fn.doc?.example) {
      sections.push("\n**Example**");
      sections.push("```c");
      sections.push(fn.doc.example);
      sections.push("```");
    }

    sections.push(""); // blank line between sections
  }

  return fm + intro + tocLines.join("\n") + "\n" + sections.join("\n") + "\n";
}

function main() {
  if (!fs.existsSync(HEADERS_DIR)) {
    console.error("Missing headers/ folder");
    process.exit(1);
  }
  ensureDir(OUT_DIR);

  // Always write a landing page
  fs.writeFileSync(
    path.join(OUT_DIR, "index.mdx"),
    `---
title: API Reference
---
Browse API references generated from header files.
`,
    "utf8"
  );

  const headerFiles = fs.readdirSync(HEADERS_DIR).filter((f) => f.endsWith(".h"));
  if (!headerFiles.length) {
    console.error("No .h files in headers/");
    process.exit(1);
  }

  let totalFunctions = 0;
  for (const file of headerFiles) {
    const srcPath = path.join(HEADERS_DIR, file);
    const src = fs.readFileSync(srcPath, "utf8");
    const base = path.basename(file, ".h");

    const entries: FnEntry[] = [];
    const seen = new Set<string>();

    // 1) docblock + prototype pairs
    let m: RegExpExecArray | null;
    while ((m = BLOCK.exec(src))) {
      const rawDoc = m[1] ?? "";
      const proto = m[2] ?? "";
      const name = funcName(proto);
      if (!name || seen.has(name)) continue;

      entries.push({
        name,
        signature: mdEscape(proto),
        doc: parseDocblock(rawDoc),
        fromDocblock: true,
      });
      seen.add(name);
    }

    // 2) bare prototypes
    let pm: RegExpExecArray | null;
    while ((pm = PROTO.exec(src))) {
      const proto = pm[2] ?? "";
      const name = funcName(proto);
      if (!name || seen.has(name)) continue;
      if (!/\(.*\)\s*;/.test(proto)) continue;

      entries.push({
        name,
        signature: mdEscape(proto),
        fromDocblock: false,
      });
      seen.add(name);
    }

    if (entries.length === 0) continue;

    // Sort by name for stable TOC
    entries.sort((a, b) => a.name.localeCompare(b.name));

    const outFile = path.join(OUT_DIR, `${base}.mdx`);
    fs.writeFileSync(outFile, renderHeaderPage(base, entries), "utf8");
    totalFunctions += entries.length;
    console.log(`${base}.h → ${entries.length} function(s) → ${outFile}`);
  }

  if (totalFunctions === 0) {
    console.error("No function prototypes found in any header.");
    process.exit(2);
  } else {
    console.log(`Generated ${totalFunctions} function section(s) across ${headerFiles.length} header(s).`);
  }
}

main();
