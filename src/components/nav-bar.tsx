"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type NavKey =
  | "home"
  | "about"
  | "products"
  | "customers"
  | "contact"
  | "location"
  | "docs";

const NavBar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("NavBar");
  const shouldReduceMotion = useReducedMotion();

  const navItems: { key: NavKey; href: string }[] = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "products", href: "/products" },
    { key: "customers", href: "/customers" },
    { key: "contact", href: "/contact" },
    { key: "location", href: "/location" },
    { key: "docs", href: "/docs" },
  ];

  return (
    <nav className="flex flex-wrap">
      {navItems.map((item, index) => {
        const isActive =
          pathname === `/${locale}${item.href}` ||
          (item.href !== "/" && pathname.startsWith(`/${locale}${item.href}`));

        return (
          <Link
            className={`relative px-4 py-2 text-center font-medium text-white ${
              index === 0
                ? "bg-blue-600"
                : "bg-linear-to-r from-blue-800 to-blue-400"
            } flex-1 overflow-hidden border-blue-600 border-r transition-colors hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600`}
            href={item.href}
            key={item.key}
          >
            {isActive && (
              <motion.div
                animate={{ y: 0 }}
                className="absolute inset-0 bg-blue-600 opacity-50"
                initial={shouldReduceMotion ? { y: 0 } : { y: "-100%" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              />
            )}
            <span className={isActive ? "relative font-bold" : "relative"}>
              {t(item.key)}
            </span>
            {isActive && (
              <motion.div
                animate={{ scaleX: 1 }}
                className="absolute right-0 bottom-0 left-0 h-1 bg-orange-400"
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  delay: shouldReduceMotion ? 0 : 0.2,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
