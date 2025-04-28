'use client'

import { LayoutDashboard, Wallet, Settings, LogOut, LogIn, ChevronDown, Plus } from "lucide-react"

import { usePathname } from "next/navigation"

import Favicon from "@/app/favicon.ico"

import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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
import { cn } from "@/lib/utils"
import { getWallets } from "@/app/actions/actions"
import { useEffect, useState } from "react"
import Modal from "./wallet-modal"
import WalletModal from "./wallet-modal"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [wallets, setWallets] = useState<{ id: string; title: string | null; url: string }[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { userId, isLoaded } = useAuth();

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    const fetchWallets = async () => {
      if (!isLoaded) return;

      const wallets = await getWallets({ userId: userId })
      const mapped = wallets?.map((wallet) => ({
        id: wallet.id,
        title: wallet.name,
        url: `/wallets/${wallet.id}`,
      }))
      setWallets(mapped || [])
    }

    fetchWallets()
  }, [userId, isLoaded])

  return (
    <Sidebar>
        {modalIsOpen ? <WalletModal closeModal={closeModal}/> : <></>}
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
        <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild className="cursor-pointer">
          <CollapsibleTrigger>
            My Wallets
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent />
          <SidebarMenu>
            {wallets?.map((wallet) => (<SidebarMenuItem key={wallet.id}>
              <SidebarMenuButton asChild className={cn("hover:cursor-pointer", wallet.url === pathname ? `bg-primary hover:bg-primary` : ``)} key={wallet.title}>
                <Link href={wallet.url} key={wallet.id}>
                  <Wallet />
                  <span>{wallet.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem> ))}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:cursor-pointer hover:bg-emerald-300 hover:text-secondary" onClick={() => setModalIsOpen(true)}>
                  <span>
                    <Plus />
                    <span>Create new Wallet</span>
                  </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <SidebarMenuItem className="cursor-pointer list-none">
            <Link href="/settings">
              <SidebarMenuButton className="cursor-pointer">
                <Settings />
                Settings
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SignOutButton>
            <SidebarMenuItem className="cursor-pointer list-none">
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