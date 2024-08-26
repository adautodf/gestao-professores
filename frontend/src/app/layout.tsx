import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/next-ui";
import Sidebar from "./_components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unifor - Professores",
  description: "Gestão de Professores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="light">
      <body className={inter.className}>
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
