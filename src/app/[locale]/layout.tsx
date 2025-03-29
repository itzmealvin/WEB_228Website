import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import NavBar from "@/components/nav-bar";
import { routing } from "@/i18n/routing";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "228 Website",
  description:
    "Welcome to 228 - Your trusted source for industrial safety solutions.",
  openGraph: {
    title: "228 Website",
    description:
      "Welcome to 228 - Your trusted source for industrial safety solutions.",
    url: "https://www.228.vn",
    siteName: "228 Website",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "228 Website",
    description:
      "Welcome to 228 - Your trusted source for industrial safety solutions.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
            href="#main-content"
          >
            Skip to main content
          </a>
          <Contact />
          <Header />
          <NavBar />
          <main className="mx-auto max-w-screen bg-white p-4" id="main-content">
            {children}
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
