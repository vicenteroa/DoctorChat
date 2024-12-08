import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

export default function ChatForm({
  input,
  setInput,
  handleSubmit,
  handleSchedule,
  isLoading,
  messageCount
}: {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (e: React.FormEvent) => void
  handleSchedule: () => void
  isLoading: boolean
  messageCount: number
}) {
  return (
    <footer className="bg-white border-t p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow"
          disabled={messageCount >= 2}
        />
        <Button type="submit" disabled={isLoading || messageCount >= 2}>
          <Send className="h-4 w-4 mr-2" />
          Enviar {messageCount < 2 ? `(${2 - messageCount})` : ''}
        </Button>
        <Button
          type="button"
          onClick={handleSchedule}
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Agendar
        </Button>
      </form>
      {messageCount >= 5 && (
        <p className="text-red-500 text-sm mt-2">
          Has alcanzado el límite de mensajes para esta versión de prueba.
        </p>
      )}
    </footer>
  )
}
