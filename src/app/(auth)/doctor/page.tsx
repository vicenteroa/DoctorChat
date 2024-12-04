'use client'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Login from '../login/api/Login'
import AuthLayout from '../layout'
import notify from '@/utils/notify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await Login(email, password)
    if (response) {
      notify('Sesión iniciada correctamente', 'success')
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    } else {
      notify('Error al iniciar sesión', 'error')
    }
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full mt-16 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto w-[350px] space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Bienvenido Doctores</h1>
                <h2 className="text-2xl">Iniciar sesión</h2>
                <p className="text-muted-foreground">
                  Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                      prefetch={false}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?{' '}
                <Link href="/register" className="underline" prefetch={false}>
                  Regístrate
                </Link>
              </div>

              <ToastContainer />
            </div>
          </div>
          <div className="hidden bg-muted lg:block">
            <Image
              src="/robotdocotr.jpg"
              alt="Imagen"
              width="1920"
              height="1080"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  )
}
