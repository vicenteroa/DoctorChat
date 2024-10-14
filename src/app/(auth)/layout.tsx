import { ReactNode } from 'react'
import Navbar from '@/components/navbar/navbar'

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div>
    <Navbar />
    {children}
  </div>
  )
}

export default AuthLayout
