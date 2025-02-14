import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { Instagram } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rhemafy | Explore Biblical Insights with AI",
  description: "Explore a rich collection of articles and insights on biblical scripture, powered by Rhemafyl's innovative technology.",
  keywords: "Rhemafy, Bible, Scripture, AI, Biblical Insights, Theology, Faith",
  // author: "Rhemafy Team",
  openGraph: {
    title: "Rhemafy| Explore Biblical Insights with AI",
    description: "Discover articles and insights on biblical scripture, enhanced by Rhemafy. Dive deeper into theology with AI-powered analysis.",
    // url: "https://yourdomain.com", 
    // Replace with your actual domain
    type: "website",
    images: [
      // {
      //   url: "https://yourdomain.com/og-image.jpg", 
      //   width: 1200,
      //   height: 630,
      //   alt: "Rhemafy Articles",
      // },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "Rhemafy", // Replace with your actual Twitter handle
    title: "Rhemafy | Explore Biblical Insights with AI",
    description: "Engage with AI-powered insights into biblical scripture with Rhemafy's articles and resources.",
    // image: "https://yourdomain.com/twitter-image.jpg", 
    // Replace with your actual image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="max-w-2xl mx-auto px-4 py-5">
            {children}
          </main>
          <footer className="text-center py-8">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              © 2025 Rhemafy
            </p>

            <div className="justify-center flex mt-2">
              <a href="https://www.instagram.com/rhemafy">
            <p className="text-sm text-gray-700 dark:text-gray-400">
            <Instagram />
            </p>
            </a>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
