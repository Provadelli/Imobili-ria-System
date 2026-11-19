import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Reserva Imperiale: residências de 520 a 680m² na Avenida Paulista, São Paulo. Conheça plantas, comodidades e agende uma visita com a Atelier Residences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Reserva Imperiale | Atelier Residences — Imóveis de alto padrão em São Paulo",
    template: "%s | Atelier Residences",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Atelier Residences",
    title: "Reserva Imperiale | Atelier Residences",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserva Imperiale | Atelier Residences",
    description,
  },
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
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
