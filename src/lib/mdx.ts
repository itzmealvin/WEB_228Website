import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import type { useTranslations } from "next-intl";
import { cache } from "react";

type DocsPageTranslator = ReturnType<typeof useTranslations<"DocsPage">>;

interface DocItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  filePath: string;
}

export const getLocalizedDocs = cache(async function getLocalizedDocs(
  locale: string,
  t: DocsPageTranslator
): Promise<DocItem[]> {
  const docsDir = join(process.cwd(), "src", "docs");
  const dirEntries = await readdir(docsDir);

  const promises = dirEntries
    .filter((file) => file.endsWith(`.${locale}.mdx`))
    .map(async (file) => {
      const slug = file.replace(`.${locale}.mdx`, "");
      const filePath = join(docsDir, file);
      const fileContent = await readFile(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title,
        description: data.description || t("noDesc"),
        date: data.date,
        author: t("author"),
        filePath,
      } as DocItem;
    });

  return Promise.all(promises);
});
