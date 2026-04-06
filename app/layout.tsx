import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

// Athletic display — hero names, section titles, stats, marquee
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

// Elegant serif — quotes, gallery captions, partner names, footer
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Body — labels, nav, body copy
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Virat Kohli · The King of Cricket",
  description: "Official website of Virat Kohli — 100 international centuries, India's greatest batsman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${instrumentSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
