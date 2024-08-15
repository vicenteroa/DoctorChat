import { useState } from 'react'
import axios from 'axios'

export default function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState(false)

  const registerUser = async (
    url: string,
    user: string,
    email: string,
    password: string,
    name: string,
    rut: string
  ) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        user,
        email,
        password,
        name,
        rut
      })
      setSuccess(true)
      return res.data
    } catch (error) {
      setError('Error al crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  return { registerUser, loading, error, success }
}
