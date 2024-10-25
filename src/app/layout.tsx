import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const nonoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Words Galore",
  description:
    "A website testing NextJS 15 Canary, consisting of a lot of word utilites :D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nonoSans.className} antialiased dark w-full h-full flex flex-col items-center justify-center`}
      >
        <div className="max-w-fullPage w-full h-full flex flex-col items-center justify-start gap-6 px-2 md:px-0">
          {children}
        </div>
      </body>
    </html>
  );
}
