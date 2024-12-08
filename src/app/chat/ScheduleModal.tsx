import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'

type Doctor = {
  id: string
  name: string
  specialty: string
}

export default function ScheduleModal({
  isModalOpen,
  setIsModalOpen,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  date,
  setDate,
  handleConfirmSchedule,
  handleCloseModal
}: {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  doctors: Doctor[]
  selectedDoctor: string | undefined
  setSelectedDoctor: React.Dispatch<React.SetStateAction<string | undefined>>
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  handleConfirmSchedule: () => void
  handleCloseModal: () => void
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar cita</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <Select onValueChange={setSelectedDoctor}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmSchedule} disabled={!selectedDoctor}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
