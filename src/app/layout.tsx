import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Backendbro's Portfolio",
  description:
    "Showcasing my skills, projects, and experience in Software Engineering, Technical Writing and Cyber-security. Explore my work and connect with me for collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={urbanist.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
