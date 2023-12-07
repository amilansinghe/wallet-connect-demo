import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/Sidebar";
import { RainbowKit } from "@/providers/RainbowKit";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SAMPLE WALLET CONNECT",
  description: "Welcome to sample wallet connect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RainbowKit>
            <SideBar />
            <Header />
            <main>{children}</main>
            <Footer />
          </RainbowKit>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
