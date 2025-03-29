"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { type FieldError, type FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const PHONE_REGEX = /^0\d{9}$/;

const ContactPage = () => {
  const t = useTranslations("ContactPage");
  const [sent, setSent] = useState(false);
  const formId = useId();

  const schema = z.object({
    name: z.string().min(2, { message: t("errors.name") }),
    phone: z.string().regex(PHONE_REGEX, { message: t("errors.phone") }),
    company: z.string().min(5, { message: t("errors.company") }),
    companyAddress: z.string().min(10, { message: t("errors.companyAddress") }),
    email: z.email({ message: t("errors.email") }),
    productQuotation: z.string().min(1, {
      message: t("errors.productQuotation"),
    }),
    interest: z.string().optional(),
    inquiry: z.string().min(20, { message: t("errors.inquiry") }),
    "h-captcha-response": z.string(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          access_key: "",
          subject: "[228.vn] - Có yêu cầu mới từ khách hàng",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
      }
    } catch (_error) {
      // Error handled silently - form submission failed
    }
  };

  const inputClass = (hasError: boolean) =>
    clsx(
      "w-full border-b py-2 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      hasError ? "border-red-500" : "border-gray-300"
    );

  const renderError = (fieldError: FieldError | undefined, id: string) =>
    fieldError?.message && (
      <p className="mt-1 text-red-500 text-xs" id={id} role="alert">
        {fieldError.message}
      </p>
    );

  const onHCaptchaChange = (token: string) => {
    setValue("h-captcha-response", token);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4 text-center">
        <h1 className="font-bold text-3xl text-blue-800">{t("title")}</h1>
        <div className="mx-auto my-2 h-px w-full max-w-md bg-gray-400" />
        <h2 className="text-blue-600 text-xl tracking-wider">
          {t("subtitle")}
        </h2>
      </div>

      {sent ? (
        <div
          aria-live="polite"
          className="rounded-sm border border-green-200 bg-green-50 p-4 text-center text-green-500"
        >
          <p className="text-2xl">{t("thankYou")}</p>
          <p className="mt-1 text-lg">{t("ASAP")}</p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor={`${formId}-name`}>
                {t("name")}
              </label>
              <input
                aria-describedby={
                  errors.name ? `${formId}-name-error` : undefined
                }
                aria-invalid={!!errors.name}
                autoComplete="name"
                className={inputClass(!!errors.name)}
                id={`${formId}-name`}
                placeholder={`${t("name")}…`}
                type="text"
                {...register("name")}
              />
              {renderError(errors.name, `${formId}-name-error`)}
            </div>

            <div>
              <label className="sr-only" htmlFor={`${formId}-phone`}>
                {t("phone")}
              </label>
              <input
                aria-describedby={
                  errors.phone ? `${formId}-phone-error` : undefined
                }
                aria-invalid={!!errors.phone}
                autoComplete="tel"
                className={inputClass(!!errors.phone)}
                id={`${formId}-phone`}
                inputMode="tel"
                placeholder={`${t("phone")}…`}
                type="tel"
                {...register("phone")}
              />
              {renderError(errors.phone, `${formId}-phone-error`)}
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor={`${formId}-company`}>
              {t("company")}
            </label>
            <input
              aria-describedby={
                errors.company ? `${formId}-company-error` : undefined
              }
              aria-invalid={!!errors.company}
              autoComplete="organization"
              className={inputClass(!!errors.company)}
              id={`${formId}-company`}
              placeholder={`${t("company")}…`}
              type="text"
              {...register("company")}
            />
            {renderError(errors.company, `${formId}-company-error`)}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${formId}-companyAddress`}>
              {t("companyAddress")}
            </label>
            <input
              aria-describedby={
                errors.companyAddress
                  ? `${formId}-companyAddress-error`
                  : undefined
              }
              aria-invalid={!!errors.companyAddress}
              autoComplete="street-address"
              className={inputClass(!!errors.companyAddress)}
              id={`${formId}-companyAddress`}
              placeholder={`${t("companyAddress")}…`}
              type="text"
              {...register("companyAddress")}
            />
            {renderError(
              errors.companyAddress,
              `${formId}-companyAddress-error`
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${formId}-email`}>
              Email
            </label>
            <input
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              aria-invalid={!!errors.email}
              autoComplete="email"
              className={inputClass(!!errors.email)}
              id={`${formId}-email`}
              placeholder="Email…"
              spellCheck={false}
              type="email"
              {...register("email")}
            />
            {renderError(errors.email, `${formId}-email-error`)}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${formId}-productQuotation`}>
              {t("productQuotation")}
            </label>
            <select
              aria-describedby={
                errors.productQuotation
                  ? `${formId}-productQuotation-error`
                  : undefined
              }
              aria-invalid={!!errors.productQuotation}
              className={clsx(
                inputClass(!!errors.productQuotation),
                "bg-white"
              )}
              id={`${formId}-productQuotation`}
              {...register("productQuotation")}
            >
              <option disabled value="">
                {t("productQuotation")}
              </option>
              <option value="general">{t("quotationOptions.general")}</option>
              <option value="specific">{t("quotationOptions.specific")}</option>
              <option value="bulk">{t("quotationOptions.bulk")}</option>
              <option value="custom">{t("quotationOptions.custom")}</option>
            </select>
            {renderError(
              errors.productQuotation,
              `${formId}-productQuotation-error`
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${formId}-interest`}>
              {t("interest")}
            </label>
            <input
              autoComplete="off"
              className={inputClass(false)}
              id={`${formId}-interest`}
              placeholder={`${t("interest")}…`}
              type="text"
              {...register("interest")}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor={`${formId}-inquiry`}>
              {t("inquiry")}
            </label>
            <textarea
              aria-describedby={
                errors.inquiry ? `${formId}-inquiry-error` : undefined
              }
              aria-invalid={!!errors.inquiry}
              className={clsx(inputClass(!!errors.inquiry), "resize-none")}
              id={`${formId}-inquiry`}
              placeholder={`${t("inquiry")}…`}
              rows={2}
              {...register("inquiry")}
            />
            {renderError(errors.inquiry, `${formId}-inquiry-error`)}
          </div>

          <div className="pt-4">
            <div className="mb-6 flex items-center">
              <HCaptcha
                onVerify={onHCaptchaChange}
                reCaptchaCompat={false}
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              />
            </div>

            <div className="text-center">
              <button
                className={clsx(
                  "inline-block border px-4 py-2 font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  isSubmitting
                    ? "bg-gray-200 text-gray-500"
                    : "hover:bg-blue-600 hover:text-white"
                )}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? `${t("sending")}…` : t("send")}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
