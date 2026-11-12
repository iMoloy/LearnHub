import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LearnHub — Online Learning Platform",
    template: "%s | LearnHub",
  },
  description:
    "Discover and view top-quality online courses. Learn at your own pace.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-[#f8f9fa] text-gray-900 dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
