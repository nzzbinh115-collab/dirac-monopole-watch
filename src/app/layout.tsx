import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dirac Monopole Watch",
  description: "Private research observatory for Dirac magnetic monopole research.",
};

export const viewport: Viewport = { themeColor: "#f5f1e8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`h-full ${ibmPlexSans.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <body className="min-h-full"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
