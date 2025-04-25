import { AppSidebar } from "@/components/sidebar";
import Accessbar from "@/components/accessbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <div className="flex flex-row w-full h-screen">
            <AppSidebar />
            <div className="w-full flex flex-col">
              <Accessbar />
              {children}
            </div>
        </div>
    </SidebarProvider>
  );
}