import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, Settings, HelpCircle } from 'lucide-react'
import { auth } from '@/services/firebase'
import { signOut } from 'firebase/auth'

type Profile = {
  name: string
  avatar: string
}

export default function Sidebar({ profile }: { profile: Profile }) {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{profile.name}</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <Button variant="ghost" className="w-full justify-start mb-2">
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2">
          <HelpCircle className="mr-2 h-4 w-4" />
          Ayuda
        </Button>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={() => signOut(auth)}
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}
