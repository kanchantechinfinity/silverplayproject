import type { Metadata } from "next";
import {
  Cinzel,
  Cinzel_Decorative,
  Cormorant_Garamond,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzelDec = Cinzel_Decorative({
  variable: "--font-cinzel-dec",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Silver Play — Think Silver. Think Silver Play",
  description:
    "Handcrafted sterling silver jewellery, forged for the woman who wears her story. 925 BIS-certified, artisan crafted in India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDec.variable} ${cormorant.variable} ${tiro.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col bg-bone text-ink"
        suppressHydrationWarning
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
