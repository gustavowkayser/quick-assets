'use client'

import DashboardContent from '@/components/dashboard-content'
import { ComboboxDemo } from '@/components/ui/combobox'
import { Separator } from '@/components/ui/separator'
import React, { use, useEffect, useState } from 'react'

import { getUserId, getWallets } from '@/app/actions/actions'

import { useSearchParams } from 'next/navigation'
import { OptionsProps } from '@/lib/types'


function Dashboard() {
  const [options, setOptions] = useState<OptionsProps[]>([])

  useEffect(() => {
    async function fetchWallets() {
      const data = await getWallets({ userId: '1234' })
      const mapped = data.map((c) => ({
        label: c.name,
        value: c.id,
      }))
      setOptions(mapped)
      console.log("Fetched wallets:", mapped)
    }

    fetchWallets()
  }, [])

  return (
    <div className='w-full h-full bg-background p-4'>
      <div className='flex flex-row gap-5 align-middle items-center'>
        <h1 className='text-xl font-normal px-5 py-5'>Dashboard</h1>
        <ComboboxDemo options={options} selectLabel="Select a Wallet" notFoundLabel="Wallet not found" searchPlaceholder="Search a Wallet"/>
      </div>
      <Separator />
      <DashboardContent />
    </div>
  )
}

export default Dashboard