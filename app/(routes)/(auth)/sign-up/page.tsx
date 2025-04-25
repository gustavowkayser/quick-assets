import { SignUp } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className='min-h-screen flex justify-center items-center align-middle'>
        <SignUp forceRedirectUrl='/dashboard'/>
    </div>
  )
}

export default Page