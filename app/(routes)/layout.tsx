import { Inter } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";

import type { Metadata } from "next";
import "@/app/globals.css";

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Quick Assets",
  description: "A simple asset manager",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibm = IBM_Plex_Sans({ weight: "600", subsets: ["latin"], variable: "--font-ibm" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
