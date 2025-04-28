'use client'

import { deleteWalletById, getWalletById, getWalletsByUserId } from '@/app/actions/actions'
import { revalidate } from '@/app/actions/routing'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { Wallet } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { userId, isLoaded } = useAuth()
  const [walletData, setWalletData] = useState<Wallet | null>(null)
  const [paramId, setParamId] = useState<string>();
  const [IdIsValid, setIdIsValid] = useState(true)

  const router = useRouter();
  const pathname = usePathname();
  
  const handleDelete = useCallback(() => {
    const deleteWallet = async () => {
      if (!paramId) return

      await deleteWalletById(paramId)
    }

    deleteWallet()
  }, [paramId, router])

  useEffect(() => {
    const setParams = async () => {
      const id = (await params).id
      setParamId(id)
    }

    const getWalletData = async (walletId: string) => {
      if (!isLoaded || !userId || !paramId) return;

      const wallet = await getWalletById(walletId)

      if (!wallet) {
        setIdIsValid(false)
        return;
      }

      if (userId != wallet.userId) throw new Error('User not authorized')

      setWalletData(wallet)
    }

    setParams()
    getWalletData(paramId || '')
  }, [userId, isLoaded, paramId])

  if (!IdIsValid) return (
    <div className='w-full h-full bg-background p-5'>
      <h1>Wallet not Found</h1>
    </div>
  )

  return (
    <div className='w-full h-full bg-background p-5'>
      <header className='flex gap-2 justify-center'>
        <h1>{walletData?.name}</h1>
        <Button onClick={handleDelete}>Delete Wallet</Button>
      </header>
    </div>
  )
}

export default Page