import type { Metadata } from "next";
import { useTranslations } from "next-intl";

const LocationPage = () => {
  const t = useTranslations("LocationPage");

  return (
    <div className="max-w mx-auto mt-4 space-y-6 border px-4 py-8 text-gray-700">
      <h1 className="font-bold text-3xl text-blue-800">{t("title")}</h1>

      <h2 className="font-semibold text-2xl text-orange-600">
        {t("message1")}
      </h2>

      <h2 className="font-semibold text-2xl text-orange-600">
        {t("message2")}
      </h2>

      <h3 className="font-extrabold text-blue-600 text-xl">{t("label")}</h3>
      <div className="aspect-video w-full">
        <iframe
          allowFullScreen={false}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2643337648633!2d106.6525476107465!3d10.791055389314248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecad05cb6a3%3A0xc5852236006a9ce6!2zMTA3My8yOCBDw6FjaCBN4bqhbmcgVGjDoW5nIFTDoW0sIEtodSBQaOG7kSAzLCBUw6JuIELDrG5oLCBI4buTIENow60gTWluaCA3MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1743273492295!5m2!1svi!2s"
          title="Google Maps iFrame to 228 HQ"
        />
      </div>
    </div>
  );
};
export default LocationPage;

export const metadata: Metadata = {
  title: "228 Website - Locations",
  description: "Find our locations across the country and connect with us.",
  openGraph: {
    title: "228 Website - Locations",
    description: "Find our locations across the country and connect with us.",
    url: "https://www.228.vn/location",
    siteName: "228 Website",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "228 Website - Locations",
    description: "Find our locations across the country and connect with us.",
  },
  alternates: {
    canonical: "/location",
  },
  robots: {
    index: true,
    follow: true,
  },
};
