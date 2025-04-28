import { AppSidebar } from "@/components/sidebar";
import Accessbar from "@/components/dashboard/accessbar";
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
import { createUserIfNotExists } from "@/app/actions/createUserIfNotExists";
import UserSetup from "@/components/user-setup";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <UserSetup>
      <SidebarProvider>
          <div className="flex flex-row w-full h-screen">
              <AppSidebar />
              <div className="w-full flex flex-col">
                <Accessbar />
                {children}
              </div>
          </div>
      </SidebarProvider>
    </UserSetup>
  );
}