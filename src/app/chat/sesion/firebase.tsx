'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/services/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
      if (!currentUser) {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  return { user, loading }
}
