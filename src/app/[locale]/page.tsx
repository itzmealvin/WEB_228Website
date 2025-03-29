import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="max-w mx-auto mt-4 space-y-6 border px-4 py-8 text-gray-700">
      <h1 className="font-bold text-3xl text-blue-800">{t("title")}</h1>

      <h2 className="font-semibold text-2xl text-orange-600">
        {t("subtitle")}
      </h2>
      <h3 className="font-extrabold text-blue-600 text-xl">{t("exclusive")}</h3>

      <div className="mt-2">
        <p>{t("message1")}</p>
        <br />
        <p>{t("message2")}</p>
        <br />
        <p>{t("message3")}</p>
      </div>
    </div>
  );
};
export default HomePage;
