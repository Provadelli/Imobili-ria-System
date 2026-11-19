import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { ConsentProvider } from "@/hooks/use-consent";
import { CookieConsent } from "@/components/cookie-consent";
import { MotionProvider } from "@/components/motion-provider";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const displayFont = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: "Atelier Residences | Reserva Imperiale",
    template: "%s | Atelier Residences",
  },
  description:
    "Imobiliária de alto padrão em São Paulo. Conheça o Reserva Imperiale: coberturas, gardens e andares inteiros com arquitetura autoral e atendimento sob medida.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Atelier Residences",
    title: "Atelier Residences | Reserva Imperiale",
    description: "Arquitetura autoral e atendimento sob medida. Agende sua visita privativa.",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "Atelier Residences | Reserva Imperiale" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fcf9f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <a
          href="#main-content"
          className="sr-only rounded-full bg-ink px-5 py-3 text-sm text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <ConsentProvider>
            {children}
            <CookieConsent />
          </ConsentProvider>
        </MotionProvider>
        <JsonLd />
      </body>
    </html>
  );
}
