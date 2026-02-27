import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      tabMode="top"
      sidebar={{
        defaultOpenLevel: 2,
        collapsible: true,
      }}
    >
      {children}
    </DocsLayout>
  );
}
