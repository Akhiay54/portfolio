import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
import { siteUrl } from "@/lib/site";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akhilesh Yadav | Android Engineer",
    template: "%s | Akhilesh Yadav",
  },
  description:
    "Portfolio of Akhilesh Yadav, an Android engineer with 4+ years building production apps in Kotlin and Jetpack Compose.",
  applicationName: "Akhilesh Yadav Portfolio",
  keywords: [
    "Akhilesh Yadav",
    "Android Developer",
    "Android Engineer",
    "Kotlin",
    "Jetpack Compose",
    "Kotlin Multiplatform",
    "Portfolio",
  ],
  authors: [{ name: "Akhilesh Yadav", url: siteUrl }],
  creator: "Akhilesh Yadav",
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Akhilesh Yadav | Android Engineer",
    description:
      "Android engineer building production apps in Kotlin and Jetpack Compose.",
    url: siteUrl,
    siteName: "Akhilesh Yadav Portfolio",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Akhilesh Yadav — Android Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhilesh Yadav | Android Engineer",
    description:
      "Android engineer building production apps in Kotlin and Jetpack Compose.",
    images: ["/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Browser extensions (Grammarly, etc.) inject attributes into <html>/<body>
  // before hydration; suppressHydrationWarning stops React reporting them as
  // our mismatch.
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main>{children}</main>
        <ScrollToTopButton />
        <Footer />
        <ToastContainer theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
