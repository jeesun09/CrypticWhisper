import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const encode_sans = Encode_Sans({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://m4you.vercel.app/"),
  title: {
    default: "M4You",
    template: "%s | M4You",
  },
  description:
    "Send anonymous messages easily with M4You. A application that lets users create shareable public links. Enjoy secure authentication, AI-driven message suggestions, and a fully responsive design for seamless user experience.",
  applicationName: "M4You",
  authors: [
    { name: "Jeesun Bari", url: "https://www.linkedin.com/in/jeesun30/" },
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "M4You",
    description: "Send anonymous messages easily with M4You.",
    url: "https://m4you.vercel.app/",
    siteName: "M4You",
    type: "website",
    images: [
      {
        url: "https://github.com/jeesun09/M4You/blob/main/public/Home.png?raw=true",
        width: 1200,
        height: 630,
        alt: "M4You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M4You",
    description: "Send anonymous messages easily with M4You.",
    creator: "@JeesunSk",
    images: [
      {
        url: "https://github.com/jeesun09/M4You/blob/main/public/Home.png?raw=true",
        width: 1200,
        height: 630,
        alt: "M4You",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={encode_sans.className}>
          <Navbar />
          {children}
          <Toaster />
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
