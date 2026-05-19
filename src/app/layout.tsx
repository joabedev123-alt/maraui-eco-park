import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maraui Eco Park - Natureza, Aventura e Experiências Inesquecíveis",
  description: "Hospedagem, ecoturismo, eventos e experiências outdoor localizado em Timon - Maranhão.",
  icons: {
    icon: "/logo preferencial_page-0001.png",
    shortcut: "/logo preferencial_page-0001.png",
    apple: "/logo preferencial_page-0001.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8F8F8] text-[#151515] overflow-x-hidden">{children}</body>
    </html>
  );
}
