import React from 'react'
import { Input } from '../ui/input'

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

function Accessbar() {
  return (
    <div className='flex flex-row bg-background h-20 items-center justify-between border-b-2 border-b-secondary px-6'>
      <div />
      <Input placeholder='Search' className='w-1/2'/>
      <UserButton
        appearance={
          { elements: 
            { userButtonAvatarBox: 'w-10 h-10' } 
          }
        }
      />
    </div>
  )
}

export default Accessbar