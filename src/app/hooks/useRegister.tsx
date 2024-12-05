import { useState } from 'react'

export function useRegister() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const registerUser = async (
    url: string,
    user: string,
    email: string,
    password: string,
    name: string,
    rut: string
  ): Promise<string> => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, email, password, name, rut })
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud')
      }

      const successMessage = 'Usuario creado correctamente'
      setMessage(successMessage)
      return successMessage
    } catch (err) {
      const errorMessage = 'Error al crear el usuario'
      setMessage(errorMessage)
      return errorMessage
    } finally {
      setLoading(false)
    }
  }

  return { registerUser, loading, message }
}
