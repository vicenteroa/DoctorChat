import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
const onest = Onest({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Doctor Chat',
  description: 'La primera inteligencia artificial para tus citas medicas',
  creator: 'Vicente Roa'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
