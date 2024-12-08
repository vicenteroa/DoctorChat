'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AlertTriangle } from 'lucide-react'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import useChat from '../hooks/useChat'
import Header from './header'
import Sidebar from './sidebar'
import MessageArea from './messageArea'
import ChatForm from './chatFrom'
import ScheduleModal from './ScheduleModal'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Profile = {
  name: string
  avatar: string
}

type Doctor = {
  id: string
  name: string
  specialty: string
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [users, setUser] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>()
  const [date, setDate] = useState<Date | undefined>(new Date())

  const doctors: Doctor[] = [{ id: '1', name: 'Dr. Juan Pérez', specialty: 'Medicina General' }]

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
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }
  }, [aiMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || messageCount >= 2) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setMessageCount((prev) => prev + 1)

    await fetchMessage()
  }

  const sendChatToEndpoint = async (chatMessages: Message[]) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/informe/generar`, {
        chat: chatMessages.map((msg) => ({ role: msg.role, message: msg.content }))
      })
    } catch (error) {
      console.error('Error sending chat to endpoint:', error)
    }
  }

  const handleSchedule = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDoctor(undefined)
  }

  const handleConfirmSchedule = async () => {
    if (selectedDoctor && date) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/citas/register`, {
          userId: users,
          doctorId: selectedDoctor,
          date: date.toISOString()
        })
        console.log(`Cita agendada con el doctor: ${selectedDoctor}`)
        await sendChatToEndpoint(messages)
        handleCloseModal()
      } catch (error) {
        console.error('Error scheduling appointment:', error)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-red-500 text-white p-2 text-center">
        <AlertTriangle className="inline-block mr-2" size={16} />
        Esta es una versión beta de prueba del chat. Puede contener errores y su funcionamiento está
        limitado, por favor no uses esta versión para citas reales.
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar profile={profile} />
        <main className="flex-1 flex flex-col">
          <Header />
          <MessageArea messages={messages} profile={profile} isLoading={isLoading} />
          <ChatForm
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            handleSchedule={handleSchedule}
            isLoading={isLoading}
            messageCount={messageCount}
          />
        </main>
      </div>
      <ScheduleModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
        date={date}
        setDate={setDate}
        handleConfirmSchedule={handleConfirmSchedule}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}
