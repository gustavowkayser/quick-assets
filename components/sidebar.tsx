'use client'

import { LayoutDashboard, Wallet, Settings, LogOut, LogIn } from "lucide-react"

import { usePathname } from "next/navigation"

import Favicon from "@/app/favicon.ico"

import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Wallets",
    url: "/wallets",
    icon: Wallet,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
        <SidebarHeader>
            <Link href="/">
                <Image src={Favicon} alt="" width={80}/>
            </Link>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={item.url === pathname ? `bg-primary hover:bg-primary` : ``} asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <SignOutButton>
            <SidebarMenuItem className="hover:cursor-pointer list-none">
                <SignedIn>
                  <SidebarMenuButton className="text-destructive hover:bg-destructive/50 hover:cursor-pointer">
                    <LogOut />
                    Log Out
                  </SidebarMenuButton>
                </SignedIn>
              </SidebarMenuItem>
            </SignOutButton>
            <SidebarMenuItem className="hover:cursor-pointer list-none">
              <SignedOut>
                <Link href="/sign-in">
                  <SidebarMenuButton className="hover:cursor-pointer"> 
                    <LogIn />
                    Sign In
                  </SidebarMenuButton>
                </Link>
              </SignedOut>
            </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  )
}

export default Sidebar