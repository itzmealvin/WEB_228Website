import Image from "next/image";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";

const Header = () => {
  const t = useTranslations("Header");

  return (
    <div className="relative flex items-center justify-between border-b p-2">
      <div className="flex items-center gap-4">
        <div className="relative h-[100px] w-[100px]">
          <Image
            alt="228 Logo"
            className="object-contain"
            height={100}
            priority
            src="/228.png"
            width={100}
          />
        </div>
        <h1 className="font-bold text-2xl text-blue-800 md:text-3xl">
          {t("companyName")}
        </h1>
      </div>
      <div className="text-right">
        <LocaleSwitcher />
        <Image
          alt="certifications"
          className="object-contain"
          height={50}
          priority
          src="/headers.png"
          width={200}
        />
        <div className="mt-1 text-right">
          <p className="text-orange-800 text-sm">
            Industrial & Explosion Proof
          </p>
          <p className="font-bold text-blue-800 text-lg">EQUIPMENT</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
