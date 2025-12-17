import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utilities/theme-provider";
import { LanguageProvider } from "@/components/utilities/language-provider";
//import ClientOnly from "@/components/client-only";
import Navbar from "@/components/Navbar";
import DropdownOverlay from "@/components/utilities/DropdownOverlay";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { DropdownOverlayProvider } from "@/context/DropdownOverlayContext";
import { ToastProvider } from "@/components/ui/toast";
import MarketingBar from "@/components/MarketingBar";
import GithubPopup from "@/components/utilities/GithubPopup";
//import FlashlightEffect from "@/components/FlashlightEffect";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oskaz - E-Commerce Platform",
  description: "Oskaz - Modern e-commerce platform",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {process.env.NODE_ENV === "production" && (
            <>
              <link
                rel="preload"
                as="video"
                href="/oskaz-hero-background.mp4"
                type="video/mp4"
                fetchPriority="low"
              />
              <link rel="preload" as="image" href="/DesignConcept.jpg" />
            </>
          )}
        </head>
        <body
          className={`${jakarta.variable} ${outfit.variable} antialiased font-sans`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="oskaz-theme"
            disableTransitionOnChange
          >
            <ToastProvider>
              <LanguageProvider
                defaultLanguage="en"
                storageKey="oskaz-language"
              >
                {/* <FlashlightEffect /> */}
                {/* <ClientOnly> */}
                <CartProvider>
                  <DropdownOverlayProvider>
                    <Navbar />
                    <DropdownOverlay />
                    <GithubPopup />
                    <div className="">{children}</div>
                  </DropdownOverlayProvider>
                </CartProvider>
                <Footer />
                <MarketingBar />
              </LanguageProvider>
            </ToastProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
