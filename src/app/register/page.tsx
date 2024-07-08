'use client'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
export default function Component() {
  return (
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input id="username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="ejemplo@gmail.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Rut</Label>
                <Input
                  id="rut"
                  type="text"
                  placeholder="Ejemplo: 12345678-9"
                  required
                  pattern="[0-9]{2}-[0-9]{7}-[0-9]{1}"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
