'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from '../ui/card'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import ChartSection from '../chart-section'

function DashboardContent() {
  const [investedValue, setInvestedValue] = React.useState(2100)
  const [grossValue, setGrossValue] = React.useState(1500)

  const [profitPercent, setProfitPercent] = React.useState(Math.round(((Math.abs(grossValue - investedValue)) / investedValue) * 100))

  const searchParams = useSearchParams()
  const walletId = searchParams.get('wallet')

  if (!walletId) return <div className='w-full h-96 flex justify-center align-middle bg-background p-4'><h1 className='text-2xl'>Please select a wallet</h1></div>

  return (
    <div className='w-full'>
      <div className='flex flex-row gap-2'>
        <Card className='w-full'>
          <CardContent className='text-center'>
            <h1 className='font-bold text-xl'>Invested Amount</h1>
            <p className='text-[1.4rem] font-light'>R$ {investedValue}</p>
          </CardContent>
        </Card>
        <Card className='w-full'>
          <CardContent className='text-center'>
            <h1 className='font-bold text-xl'>Gross Amount</h1>
            <div className='flex flex-row gap-2 justify-center items-center align-middle'>
              {(grossValue > investedValue) ? <TrendingUp className='text-success' /> : <TrendingDown className='text-destructive' />}
              <p className={cn((grossValue > investedValue) ? 'text-success' : 'text-destructive')}>{profitPercent}%</p>
              <p className='text-[1.4rem] font-light'>R$ {grossValue}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className='my-2'>
          <CardHeader>
            <h1>Gross Value x Time</h1>
          </CardHeader>
          <CardContent>
            <ChartSection />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardContent