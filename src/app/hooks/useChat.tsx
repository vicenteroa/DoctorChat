import { useState } from 'react'
import axios from 'axios'

export default function useChat(symptoms: string) {
  const [message, setMessage] = useState('')

  const fetchMessage = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai/recommend-specialist`, {
        symptoms: symptoms
      })
      console.log(res.data.response)
      setMessage(res.data.response)
    } catch (error) {
      console.log(error)
    }
  }
  return { message, fetchMessage }
}
