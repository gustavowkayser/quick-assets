'use client'

import DashboardContent from '@/components/dashboard-content'
import { ComboboxDemo } from '@/components/ui/combobox'
import { Separator } from '@/components/ui/separator'
import React, { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

function Dashboard() {
  const wallets = [
    { value: "1", label: "Wallet 1" },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    console.log("Current URL params:", params.toString())
    const walletId = params.get('wallet')
    if (walletId) {
      console.log("Wallet ID from URL:", walletId)
    }
  })

  return (
    <div className='w-full h-full bg-background p-4'>
      <div className='flex flex-row gap-5 align-middle items-center'>
        <h1 className='text-xl font-normal px-5 py-5'>Dashboard</h1>
        <ComboboxDemo options={wallets} selectLabel="Select a Wallet" notFoundLabel="Wallet not found" searchPlaceholder="Search a Wallet"/>
      </div>
      <Separator />
      <DashboardContent />
    </div>
  )
}

export default Dashboard