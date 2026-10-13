import type { Metadata } from "next";
import "./globals.css";
import { BrandIntro } from "@/components/BrandIntro";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { CommandPaletteProvider } from "@/components/CommandPaletteProvider";
import { I18nProvider } from "@/i18n/I18nProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.BETTER_AUTH_URL ||
      "http://localhost:3000",
  ),
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  title: "HIDEKI — фотография, фильмы и мода",
  description:
    "Alexandro Hideki — photography, fashion films and visual direction. Personal shoots and brand projects. Moscow.",
  keywords: [
    "fashion",
    "photography",
    "art direction",
    "creative studio",
    "moscow",
  ],
  openGraph: {
    title: "HIDEKI — фотография, фильмы и мода",
    description:
      "Independent creative platform at the intersection of fashion, photography, film and contemporary art.",
    type: "website",
    locale: "ru_RU",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HIDEKI Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
    title: "HIDEKI — фотография, фильмы и мода",
    description:
      "Independent creative platform at the intersection of fashion, photography, film and contemporary art.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="bg-bg-primary text-text-primary">
      <head>
        <meta name="theme-color" content="#050505" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HIDEKI",
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                process.env.BETTER_AUTH_URL ||
                "http://localhost:3000",
              inLanguage: ["ru", "en"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <CommandPaletteProvider>
            <SmoothScroll>
              <CustomCursor enabled={false} />
              <Navigation theme="dark" />
              <BrandIntro />
              <a className="skip-link" href="#main-content">
                Перейти к содержимому
              </a>
              <main id="main-content">{children}</main>
            </SmoothScroll>
          </CommandPaletteProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
