import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import SmoothScroll from "@/lib/SmoothScroll";
import "./globals.css";

const siteUrl = "https://yashkuberkhanna.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yash Kuber Khanna — Developer",
  description:
    "Yash Kuber Khanna is a computer science engineer building software, intelligent systems, and digital experiences.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Yash Kuber Khanna — Developer",
    description:
      "Yash Kuber Khanna is a computer science engineer building software, intelligent systems, and digital experiences.",
    url: siteUrl,
    siteName: "Yash Kuber Khanna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Kuber Khanna — Developer",
    description:
      "Yash Kuber Khanna is a computer science engineer building software, intelligent systems, and digital experiences.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
