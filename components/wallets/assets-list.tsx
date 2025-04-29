'use client'

import React, { useEffect } from 'react'

function AssetsList() {
    useEffect(() => {
        const fetchData = async () => {
            if (!process.env['NEXT_PUBLIC_API_TOKEN']) return
            const url = await `https://brapi.dev/api/quote/PETR4?token=${process.env['NEXT_PUBLIC_API_TOKEN']}`
            let data = await fetch(url)
            let quote = await data.json()
            console.log(quote, url)
        }

        fetchData()
    }, [])

    return (
        <div className='w-full h-full'>
            AssetsList
        </div>
    )
}

export default AssetsList