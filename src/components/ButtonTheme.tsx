'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, useAnimation } from 'framer-motion'

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const controls = useAnimation()

  // Cuando el componente se monta, sabemos que estamos en el cliente
  React.useEffect(() => setMounted(true), [])

  const toggleTheme = async () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    await controls.start({ opacity: 0, rotate: 0 })
    controls.start({ opacity: 1, rotate: 360, transition: { duration: 0.2 } })
  }

  // No renderizar en el servidor
  if (!mounted) return null

  return (
    <button onClick={toggleTheme}>
      <motion.div initial={{ opacity: 1, rotate: 0 }} animate={controls}>
        {theme === 'dark' ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

// import * as React from 'react'
// import { Moon, Sun } from 'lucide-react'
// import { useTheme } from 'next-themes'
//
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu'
//
// export function ModeToggle() {
//   const { setTheme } = useTheme()
//
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           {/* <Monitor className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
