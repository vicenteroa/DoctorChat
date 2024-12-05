'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRegister } from '@/app/hooks/useRegister'
import { ToastContainer } from 'react-toastify'
import notify from '@/utils/notify'
import 'react-toastify/dist/ReactToastify.css'
import AuthLayout from '../layout'

export default function Component() {
  const [user, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rut, setRut] = useState('')

  const { registerUser, loading } = useRegister()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (password !== confirmPassword) {
      notify('Las contraseñas no coinciden', 'error')
      return
    }

    const responseMessage = await registerUser(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      user,
      email,
      password,
      name,
      rut
    )

    if (responseMessage === 'Usuario creado correctamente') {
      console.log(responseMessage)
      notify(responseMessage, 'success')
    } else {
      console.log('mensaje de error:', responseMessage)
      notify(responseMessage, 'error')
    }
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full mt-16 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="hidden bg-muted lg:block">
            <Image
              src="/robotdocotr.jpg"
              alt="Imagen"
              width="1920"
              height="1080"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto w-[350px] space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Crear una cuenta</h1>
                <p className="text-muted-foreground">
                  ¿Ya tienes una cuenta?{' '}
                  <Link href="/login" className="underline" prefetch={false}>
                    Iniciar sesión
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de usuario</Label>
                  <Input
                    id="username"
                    required
                    value={user}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut">Rut</Label>
                  <Input
                    id="rut"
                    type="text"
                    placeholder="Ejemplo: 12345678-9"
                    required
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  )
}
