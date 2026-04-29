import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rudnie Casinillo | Network Engineer & Cybersecurity Portfolio",
  description: "Computer Engineering student passionate about networking and cybersecurity. Open to opportunities in Network Engineering, Cybersecurity, and IT Helpdesk.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Rudnie Casinillo | Network Engineer & Cybersecurity Portfolio",
    description: "Computer Engineering student passionate about networking and cybersecurity. Open to opportunities in Network Engineering, Cybersecurity, and IT Helpdesk.",
    url: "https://rudnie-portfolio.vercel.app/",
    siteName: "Rudnie Casinillo Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rudnie Casinillo Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudnie Casinillo | Network Engineer & Cybersecurity Portfolio",
    description: "Computer Engineering student passionate about networking and cybersecurity. Open to opportunities in Network Engineering, Cybersecurity, and IT Helpdesk.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}