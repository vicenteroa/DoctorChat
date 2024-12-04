'use client'
/* eslint-disable */

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  LogOut,
  Settings,
  HelpCircle,
  Download,
  Users,
  Calendar,
  Activity,
  FileDown
} from 'lucide-react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, storage } from '@/services/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'

type Profile = {
  name: string
  avatar: string
  specialty: string
}

type Document = {
  name: string
  url: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<string | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  // eslint disable-next-line
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in', user)
        setUser(user.email)
        fetchDocuments()
      } else {
        console.log('User is signed out')
        window.location.href = '/login'
      }
    })
  }, [])

  const fetchDocuments = async () => {
    try {
      const informesRef = ref(storage, 'informes')
      const informesList = await listAll(informesRef)
      const docs = await Promise.all(
        informesList.items.map(async (item) => {
          const url = await getDownloadURL(item)
          return { name: item.name, url }
        })
      )
      setDocuments(docs)
      setError(null)
    } catch (err) {
      console.error('Error fetching documents:', err)
      setError('No se pudieron cargar los documentos. Por favor, inténtelo de nuevo más tarde.')
    }
  }

  const profile: Profile = {
    name: user || 'Dr. Usuario',
    avatar: '/placeholder.svg',
    specialty: 'Cardiología'
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{profile.name}</p>
              <p className="text-xs text-gray-500">{profile.specialty}</p>
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
          <Button
            variant="ghost"
            onClick={() => signOut(auth)}
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Bienvenido, {profile.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Pendientes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Para los próximos 7 días</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actividad Reciente</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">Tasa de atención</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informes Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Documento</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.name}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => window.open(doc.url, '_blank')}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
