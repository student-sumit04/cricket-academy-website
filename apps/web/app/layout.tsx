import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const condensed = Barlow_Condensed({ variable: "--font-condensed", subsets: ["latin"], weight: ["600", "700", "800"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "The Crease Cricket Academy | Bengaluru",
  description: "Purposeful cricket coaching for young players—from first net to high-performance pathways.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${condensed.variable} ${serif.variable}`}>{children}</body></html>;
}
