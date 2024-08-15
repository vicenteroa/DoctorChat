'use client'

import { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'

export default function Chat() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in', user)
      } else {
        alert('Debes iniciar sesión para acceder a esta página')
        window.location.href = '/login'
      }
    })
  }, [])

  return (
    <div id="cont" className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Prontamente, estamos en construcción...</h1>
      <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded-md">
        cerrar sesión
      </button>
    </div>
  )
}
