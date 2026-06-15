import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Inter is strictly banned.
import "./globals.css";

// Premium modern Sans-serif pairing
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Võ Hữu Trí | Digital Architect & Designer",
  description: "Xây dựng trải nghiệm số đẳng cấp. Blog & Portfolio của Võ Hữu Trí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={outfit.variable}>
      <body>
        <div className="ambient-mesh"></div>
        <div className="noise-overlay"></div>
        <main className="layout-container">
          {children}
        </main>
      </body>
    </html>
  );
}
