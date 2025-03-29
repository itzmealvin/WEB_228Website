import { HeadsetIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const contacts = [
    {
      icon: (
        <MailIcon aria-hidden="true" className="mr-1 inline-block" size={14} />
      ),
      href: "mailto:info@228.vn",
      value: "info@228.vn",
    },
    {
      icon: (
        <PhoneIcon aria-hidden="true" className="mr-1 inline-block" size={14} />
      ),
      href: "tel:+842839771858",
      value: "+84 28 3977 1858",
    },
    {
      icon: (
        <HeadsetIcon
          aria-hidden="true"
          className="mr-1 inline-block"
          size={14}
        />
      ),
      href: "tel:+84818228228",
      value: "+84 818 228 228",
    },
    {
      icon: (
        <MapPinIcon
          aria-hidden="true"
          className="mr-1 inline-block"
          size={14}
        />
      ),
      href: "https://maps.app.goo.gl/uCZw5AEYYmR5nPtQ6",
      value: t("address"),
    },
  ];

  return (
    <footer className="bg-gray-800 py-3 text-center text-white">
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        {contacts.map((contact) => (
          <a
            className="flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
            href={contact.href}
            key={contact.value}
            rel="noopener noreferrer"
            target={contact.href.startsWith("http") ? "_blank" : undefined}
          >
            {contact.icon}
            {contact.value}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
