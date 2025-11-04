/* tools/extract-headers.ts
   POC: Convert C header docblocks into MDX pages Fumadocs can render.
   Assumption: /** ... *\/ directly precedes a function signature ending with ';'
   NOTE: Replace regex with a proper parser later if headers get complex.
*/
import fs from "node:fs";
import path from "node:path";

const HEADERS_DIR = path.resolve("headers");
// Most Fuma templates read content from ./content (your template already has /content)
const OUT_DIR = path.resolve("content/docs");

const blockPair =
  /\/\*\*([\s\S]*?)\*\/\s*([a-zA-Z_][\w\s\*]+?\([^;{]*\)\s*;)/g;

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function cleanDocBlock(doc: string): string {
  return doc
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trim();
}

function mdEscape(s: string): string {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fnName(sig: string): string {
  const m = sig.match(/\b([a-zA-Z_]\w*)\s*\(/);
  return m ? m[1] : "function";
}

function page(title: string, signature: string, doc: string): string {
  return `---
title: ${title}
---

${doc ? doc + "\n" : ""}

## Signature
\`\`\`c
${signature.trim()}
\`\`\`
`;
}

function writeIndex(folder: string, headerFile: string) {
  const name = path.basename(headerFile);
  const index = `---
title: ${name} API
---

Auto-generated from \`${name}\`.`;
  fs.writeFileSync(path.join(folder, "index.mdx"), index, "utf8");
}

function extractFile(filePath: string) {
  const src = fs.readFileSync(filePath, "utf8");
  const base = path.basename(filePath, path.extname(filePath));
  const outFolder = path.join(OUT_DIR, base);
  ensureDir(outFolder);

  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = blockPair.exec(src))) {
    const doc = cleanDocBlock(match[1] ?? "");
    const sig = mdEscape(match[2] ?? "");
    const title = fnName(sig);
    const outPath = path.join(outFolder, `${String(count + 1).padStart(2, "0")}-${title}.mdx`);
    fs.writeFileSync(outPath, page(title, sig, doc), "utf8");
    count++;
  }

  writeIndex(outFolder, path.basename(filePath));
  return count;
}

function resetOut() {
  // Only remove our generated subfolders; keep any hand-written pages if you have them
  if (!fs.existsSync(OUT_DIR)) ensureDir(OUT_DIR);
  for (const name of fs.readdirSync(OUT_DIR)) {
    const p = path.join(OUT_DIR, name);
    if (fs.lstatSync(p).isDirectory() && fs.existsSync(path.join(p, "index.mdx"))) {
      fs.rmSync(p, { recursive: true, force: true });
    }
  }
}

function main() {
  if (!fs.existsSync(HEADERS_DIR)) {
    console.error(`Missing headers directory: ${HEADERS_DIR}`);
    process.exit(1);
  }

  resetOut();

  const headerFiles = fs
    .readdirSync(HEADERS_DIR)
    .filter((f) => f.endsWith(".h"))
    .map((f) => path.join(HEADERS_DIR, f));

  if (headerFiles.length === 0) {
    console.error("No .h files found in headers/");
    process.exit(1);
  }

  let total = 0;
  for (const hf of headerFiles) total += extractFile(hf);

  // Friendly landing page for the demo
  const gettingStarted = `---
title: Getting Started
---
This site is **auto-generated** from C header files in \`/headers\`.

- Edit comments in \`headers/*.h\`
- Run \`npm run build\`
- Pages appear under the header file name in the sidebar
`;
  fs.writeFileSync(path.join(OUT_DIR, "getting-started.mdx"), gettingStarted, "utf8");

  console.log(`Generated ${total} API page(s) from ${headerFiles.length} header file(s)`);
}

main();
