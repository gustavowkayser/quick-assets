import React from 'react'

import { SignIn } from '@clerk/nextjs' 

function Page() {
  return (
    <div className='min-h-screen flex justify-center items-center align-middle'>
        <SignIn forceRedirectUrl='/dashboard'/>
    </div>
  )
}

export default Page