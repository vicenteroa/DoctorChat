'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, LogOut, Settings, HelpCircle, AlertTriangle } from 'lucide-react'
import { auth } from '@/services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import useChat from '../hooks/useChat'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Profile = {
  name: string
  avatar: string
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [users, setUser] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in', user)
        setUser(user.email ?? '')
      } else {
        console.log('User is signed out')
        window.location.href = '/login'
      }
    })
  }, [])

  const profile: Profile = {
    name: users || 'Usuario',
    avatar: '/placeholder.svg'
  }

  const { message: aiMessage, fetchMessage } = useChat(input)

  useEffect(() => {
    if (aiMessage) {
      const aiResponse: Message = { role: 'assistant', content: aiMessage }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }
  }, [aiMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || messageCount >= 5) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setMessageCount(prev => prev + 1)

    await fetchMessage()
  }

  const handleSchedule = () => {
    console.log('Agendar cita...')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-red-500 text-white p-2 text-center">
        <AlertTriangle className="inline-block mr-2" size={16} />
        Esta es una versión beta de prueba del chat. Puede contener errores y su funcionamiento está limitado, por favor no uses esta versión para citas reales.
      </div>
      <div className="flex flex-1 overflow-hidden">
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
            <Button variant="ghost" onClick={() => signOut(auth)} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </aside>
        <main className="flex-1 flex flex-col">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900"></h1>
            </div>
          </header>
          <ScrollArea className="flex-1 p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-end space-x-2 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    {message.role === 'user' ? (
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                    ) : (
                      <AvatarImage src="/ai-avatar.png" alt="AI" />
                    )}
                    <AvatarFallback>
                      {message.role === 'user' ? profile.name.charAt(0) : 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-200 text-gray-900">
                  La IA está escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <footer className="bg-white border-t p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-grow"
                disabled={messageCount >= 5}
              />
              <Button type="submit" disabled={isLoading || messageCount >= 5}>
                <Send className="h-4 w-4 mr-2" />
                Enviar {messageCount < 5 ? `(${5 - messageCount})` : ''}
              </Button>
              <Button type="button" onClick={handleSchedule} variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
                Agendar
              </Button>
            </form>
            {messageCount >= 5 && (
              <p className="text-red-500 text-sm mt-2">Has alcanzado el límite de mensajes para esta versión de prueba.</p>
            )}
          </footer>
        </main>
      </div>
    </div>
  )
}
