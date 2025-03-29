import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const contacts = [
    { name: "tel", href: "tel:+842839771858", text: t("telephone") },
    { name: "email", href: "mailto:info@228.vn", text: "EMAIL" },
  ];
  return (
    <footer className="mt-8 bg-gray-500 p-6 text-center text-white">
      <p className="mb-2 font-bold">{t("companyName")}</p>
      <p className="mb-2 text-sm">{t("address")}</p>
      <div className="mb-2 text-sm">
        {contacts.map((contact) => (
          <p key={contact.name}>
            {contact.text}:
            <a
              className="ml-1 text-blue-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500"
              href={contact.href}
            >
              {contact.href.split(":")[1]}
            </a>
          </p>
        ))}
        <span className="bg-red-500 font-bold">
          {t("hotline")}:
          <a
            className="ml-1 text-blue-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-red-500"
            href="tel:+84818228228"
          >
            +84818228228
          </a>
        </span>
        <p className="font-thin">{t("copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
