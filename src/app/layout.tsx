import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title: "Dirac Monopole Watch",
  description: "Private research observatory for Dirac magnetic monopole research.",
};

export const viewport: Viewport = { themeColor: "#f5f1e8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full" suppressHydrationWarning>
      <body className="min-h-full"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
