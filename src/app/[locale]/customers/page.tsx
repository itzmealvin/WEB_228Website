import type { Metadata } from "next";
import { useTranslations } from "next-intl";

const CustomersPage = () => {
  const t = useTranslations("CustomersPage");

  return (
    <div className="max-w mx-auto mt-4 space-y-6 border px-4 py-8 text-gray-700">
      <h1 className="font-bold text-3xl text-blue-800">{t("title")}</h1>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 text-lg">{t("comingSoon")}</p>
        <p className="mt-2 text-gray-400 text-sm">{t("checkBack")}</p>
      </div>
    </div>
  );
};

export default CustomersPage;

export const metadata: Metadata = {
  title: "228 Website - Our Customers",
  description: "Meet our valued customers who trust 228 for industrial safety.",
  openGraph: {
    title: "228 Website - Our Customers",
    description:
      "Meet our valued customers who trust 228 for industrial safety.",
    url: "https://www.228.vn/customers",
    siteName: "228 Website",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "228 Website - Our Customers",
    description:
      "Meet our valued customers who trust 228 for industrial safety.",
  },
  alternates: {
    canonical: "/customers",
  },
  robots: {
    index: true,
    follow: true,
  },
};
