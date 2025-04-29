'use client'

import { createUserIfNotExists } from '@/app/actions/createUserIfNotExists'
import { useAuth, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

function UserSetup({children}: {children: React.ReactNode}) {
    const { userId, isLoaded: authLoaded } = useAuth()
    const { user, isLoaded: userLoaded } = useUser()
    
    useEffect(() => {
        const setupUser = async () => {
          if (!authLoaded || !userLoaded || !userId) return;
    
          try {
            const newUser = {
                name: user?.firstName,
                email: user?.emailAddresses[0]?.emailAddress,
            }

            await createUserIfNotExists(userId, newUser)
          } catch (error) {
            console.error('Erro criando usuário:', error)
          }
        }
    
        setupUser()
      }, [userId, authLoaded, userLoaded, user])

    return (
        <div>
            {children}
        </div>
  )
}

export default UserSetup