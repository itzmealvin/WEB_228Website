import type { Metadata } from "next";
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  const productKeys = [
    "explosionProofDeskPhone",
    "emergencyPhone",
    "wiredPhoneSystem",
    "paSystem",
    "explosionProofMobilePhone",
    "walkieTalkie",
    "dataCollector",
    "explosionProofLaptop",
    "explosionProofCamera",
    "lightingDevices",
    "explosionProofMeasurementTools",
    "industrialSockets",
    "industrialLighting",
    "automationDevices",
    "securityCamera",
    "controlAndConnectivity",
    "switchgearsAndMotors",
    "explosionProofCables",
  ] as const;

  const sectorKeys = [
    "govPrivate",
    "atm",
    "oilGas",
    "defense",
    "hotels",
    "transport",
    "intlOrgs",
    "govBodies",
  ] as const;

  return (
    <div className="max-w mx-auto mt-4 space-y-6 border px-4 py-8 text-gray-700">
      <h1 className="font-bold text-3xl text-blue-800">{t("title")}</h1>
      <h2 className="font-semibold text-2xl text-orange-600">
        {t("subtitle")}
      </h2>
      <h3 className="font-extrabold text-blue-600 text-xl">{t("message1")}</h3>
      <ul className="grid list-disc grid-cols-1 gap-4 px-5 text-gray-700 md:grid-cols-2">
        {productKeys.map((key) => (
          <li key={key}>{t(`products.${key}`)}</li>
        ))}
      </ul>
      <h3 className="font-extrabold text-blue-600 text-xl">{t("message2")}</h3>
      <ul className="grid list-disc grid-cols-1 gap-4 px-5 text-gray-700 md:grid-cols-2">
        {sectorKeys.map((key) => (
          <li key={key}>{t(`sectors.${key}`)}</li>
        ))}
      </ul>
    </div>
  );
};
export default AboutPage;

export const metadata: Metadata = {
  title: "228 Website - About Us",
  description:
    "Learn more about 228 and our commitment to safety and innovation.",
  openGraph: {
    title: "228 Website - About Us",
    description:
      "Learn more about 228 and our commitment to safety and innovation.",
    url: "https://www.228.vn/about",
    siteName: "228 Website",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "228 Website - About Us",
    description:
      "Learn more about 228 and our commitment to safety and innovation.",
  },
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};
