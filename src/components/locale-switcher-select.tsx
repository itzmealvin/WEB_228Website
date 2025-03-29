"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import type { Locale } from "next-intl";
import React, { type ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

interface Props {
  defaultValue: string;
  children: ReactNode;
}

export default function LocaleSwitcherSelect({
  defaultValue,
  children,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function handleLocaleChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error – pathname and params match
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className="my-2 items-stretch gap-2">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        const locale = child.props.value;
        const isActive = defaultValue === locale;

        return (
          <button
            aria-current={isActive ? "true" : undefined}
            aria-label={`Switch to ${child.props.children} language`}
            className={clsx(
              "p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              isActive ? "bg-blue-200" : "hover:bg-gray-50",
              isPending && "cursor-not-allowed opacity-50"
            )}
            disabled={isPending}
            onClick={() => handleLocaleChange(locale)}
            type="button"
          >
            {child.props.children}
          </button>
        );
      })}
    </div>
  );
}
