import React from 'react'
import { TextRevealByWord } from '@/components/magicui/text-reveal'
import { GoogleGeminiEffectDemo } from '@/app/GoogleDemo'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import FooterPage from '@/components/footer/footerPage'
import Image from 'next/image'

const content = [
  {
    title: '¿Qué es una inteligencia artificial?',
    description:
      'Una inteligencia artificial es un sistema capaz de realizar tareas que normalmente requerirían la intervención de un ser humano.',
    content: (
      <div className="flex flex-col gap-6">
        <Image
          src="/inteligencia-artificial.jpg"
          alt="inteligencia artificial"
          width={600}
          height={600}
        />
      </div>
    )
  },
  {
    title: '¿Qué es la inteligencia artificial en el contexto de la medicina?',
    description:
      'La inteligencia artificial se utiliza en una amplia variedad de aplicaciones, desde la toma de decisiones en empresas y organizaciones hasta la toma de decisiones en el mercado financiero y la toma de decisiones en la salud.',
    content: (
      <div className="flex flex-col gap-4">
        <Image src="/ia-medicina.jpg" alt="inteligencia artificial" width={600} height={600} />
      </div>
    )
  }
]

export default function Home() {
  return (
    <main>
      <GoogleGeminiEffectDemo />
      <TextRevealByWord text="La primera inteligencia artificial para la derivación precisa a especialistas médicos" />
      <StickyScroll content={content} />
      <FooterPage />
    </main>
  )
}
