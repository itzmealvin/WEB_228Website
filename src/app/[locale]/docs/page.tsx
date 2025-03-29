import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocalizedDocs } from "@/lib/mdx";

export default async function DocsPage() {
  const t = await getTranslations("DocsPage");
  const locale = await getLocale();
  const docs = await getLocalizedDocs(locale, t);

  const formatDate = (dateStr: string, locale: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-bold text-3xl text-blue-800">{t("title")}</h1>
      <ul className="ml-5 list-disc">
        {docs
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((doc) => (
            <li className="group relative mb-4" key={doc.slug}>
              <Link
                className="font-bold text-blue-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                href={`/docs/${doc.slug}`}
              >
                {doc.title}
                <span className="ml-2 font-semibold text-gray-400 text-sm">
                  {`${t("on")}
                ${formatDate(doc.date, locale)}
                ${t("by")}
                ${doc.author}`}
                </span>
              </Link>

              <div className="absolute top-full left-0 z-10 hidden max-w-xl rounded-sm bg-white p-3 text-black text-sm shadow-lg group-focus-within:block group-hover:block">
                <p>{doc.description}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export const metadata: Metadata = {
  title: "228 Website - Documentation",
  description: "Read articles and safety documentation provided by 228.",
  openGraph: {
    title: "228 Website - Documentation",
    description: "Read articles and safety documentation provided by 228.",
    url: "https://www.228.vn/docs",
    siteName: "228 Website",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "228 Website - Documentation",
    description: "Read articles and safety documentation provided by 228.",
  },
  alternates: {
    canonical: "/docs",
  },
  robots: {
    index: true,
    follow: true,
  },
};
