'use client'

import DashboardContent from '@/components/dashboard/dashboard-content'
import { ComboboxDemo } from '@/components/ui/combobox'
import { Separator } from '@/components/ui/separator'
import React, { Suspense, use, useEffect, useState } from 'react'

import { getUserId, getWallets } from '@/app/actions/actions'

import { useSearchParams } from 'next/navigation'
import { OptionsProps } from '@/lib/types'
import { createUserIfNotExists } from '@/app/actions/createUserIfNotExists'
import { auth } from '@clerk/nextjs/server'
import { useAuth } from '@clerk/nextjs'


function Dashboard() {
  const { userId, isLoaded } = useAuth()
  const [options, setOptions] = useState<OptionsProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWallets() {
      if (!isLoaded) return;

      const data = await getWallets({ userId: userId || ''})
      const mapped = data?.map((c) => ({
        label: c.name,
        value: c.id,
      }))
      setOptions(mapped || [])
    }

    fetchWallets()
  }, [userId, isLoaded])

  return (
    <Suspense>
      <div className='w-full h-full bg-background p-4'>
        <div className='flex flex-row gap-5 align-middle items-center'>
          <h1 className='text-xl font-normal px-5 py-5'>Dashboard</h1>
          <ComboboxDemo options={options} selectLabel="Select a Wallet" notFoundLabel="Wallet not found" searchPlaceholder="Search a Wallet"/>
        </div>
        <Separator />
        <DashboardContent />
      </div>
    </Suspense>
  )
}

export default Dashboard