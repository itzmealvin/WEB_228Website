import { join } from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";

export default async function DocPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations("DocsPage");
  const locale = await getLocale();
  const filePath = join(
    process.cwd(),
    "src",
    "docs",
    `${params.slug}.${locale}.mdx`
  );

  const raw = await Bun.file(filePath).text();
  const { content, data } = matter(raw);

  return (
    <article className="prose prose-lg max-w-none p-6">
      <div className="mb-6">
        <Link
          className="text-md hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          href="/docs"
        >
          {`← ${t("back")}`}
        </Link>
      </div>

      {data.title && (
        <h1 className="font-bold text-3xl text-blue-800">{data.title}</h1>
      )}

      {data.description && (
        <h2 className="text-gray-600 text-xl italic">{data.description}</h2>
      )}

      <hr className="my-4" />

      <MDXRemote
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        source={content}
      />
    </article>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const filePath = join(
    process.cwd(),
    "src",
    "docs",
    `${params.slug}.${params.locale}.mdx`
  );
  const fileContent = await Bun.file(filePath).text();
  const { data } = matter(fileContent);

  return {
    title: data.title || `228 Docs - ${params.slug}`,
    description: data.description || "Read more from 228 documentation.",
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://www.228.vn/docs/${params.slug}`,
      siteName: "228 Website",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: data.title,
      description: data.description,
    },
    alternates: {
      canonical: `/docs/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
