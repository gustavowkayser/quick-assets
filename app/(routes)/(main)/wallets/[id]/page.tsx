'use client'

import { deleteWalletById, getWalletById, getWalletsByUserId } from '@/app/actions/actions'
import { revalidate } from '@/app/actions/routing'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { Wallet } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import DeleteWalletModal from '@/components/delete-wallet-modal'
import { BriefcaseBusiness, TrashIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import AssetsList from '@/components/wallets/assets-list'
import NewAssetModal from '@/components/wallets/new-asset-modal'

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { userId, isLoaded } = useAuth()
  const [walletData, setWalletData] = useState<Wallet | null>(null)
  const [paramId, setParamId] = useState<string>();
  const [IdIsValid, setIdIsValid] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [newAssetModalOpen, setNewAssetModalOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const closeNewAssetModal = () => {
    setNewAssetModalOpen(false)
  }

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
      {modalIsOpen ? <DeleteWalletModal closeModal={closeModal} walletId={paramId || ''}/> : <></>}
      {newAssetModalOpen ? <NewAssetModal closeModal={closeNewAssetModal}/> : <></>}
      <header className='flex justify-between items-center align-middle my-3 mb-4'>
        <h1 className='text-2xl font-semibold'>{walletData?.name}</h1>
        <Button variant='destructive' className='cursor-pointer' onClick={() => setModalIsOpen(true)}><TrashIcon />Delete Wallet</Button>
      </header>
      <Separator className='bg-gray-700' />
      <div className='flex flex-row gap-2 mt-3 justify-between'>
        <AssetsList />
        <div>
          <Button className='bg-success text-gray-900 cursor-pointer hover:bg-success w-[8.5rem]' onClick={() => setNewAssetModalOpen(true)}><BriefcaseBusiness />New Asset</Button>
        </div>
      </div>
    </div>
  )
}

export default Page