import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat With Document",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Transform your documents and notes into interactive knowledge with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
