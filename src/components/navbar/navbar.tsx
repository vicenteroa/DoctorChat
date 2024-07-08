import Link from 'next/link'
import { ModeToggle } from '@/components/ButtonTheme'
import './navbar.css'

export const items = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Contact',
    href: '/contact'
  },
  {
    name: 'Iniciar sesión',
    href: '/login'
  }
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        {/* <MountainIcon className="h-6 w-6" /> */}
        <span className="text-lg font-semibold">DoctorChat</span>
      </Link>
      <nav className="hidden gap-4 md:flex">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-lg font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {item.name}
          </Link>
        ))}
        <div className="">
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
