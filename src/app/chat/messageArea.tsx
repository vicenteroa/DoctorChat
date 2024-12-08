import React, { useRef, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ReactMarkdown from 'react-markdown'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Profile = {
  name: string
  avatar: string
}

export default function MessageArea({
  messages,
  profile,
  isLoading
}: {
  messages: Message[]
  profile: Profile
  isLoading: boolean
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ScrollArea className="flex-1 p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex items-end space-x-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
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
              className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}
            >
              {message.role === 'user' ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
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
  )
}
