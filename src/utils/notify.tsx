import { toast } from 'react-toastify'

export default function notify(message: string, type: string) {
  if (type === 'success') {
    toast.success(message, { position: 'bottom-center', type: 'success' })
  } else if (type === 'error') {
    toast.error(message, { position: 'bottom-center', type: 'error' })
  }
}
