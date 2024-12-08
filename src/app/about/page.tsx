'use client'

import { motion } from 'framer-motion'
import FooterPage from '@/components/footer/footerPage'
import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from 'next/link'
import Navbar from '@/components/navbar/navbar'
import Image from 'next/image'

function About() {
  const [isAnimating, setIsAnimating] = useState(true)

  return (
    <div className="relative">
      <Navbar />
      {isAnimating && (
        <motion.div
          className="bg-white w-full h-screen absolute z-10"
          initial={{ x: 0 }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2 }}
          onAnimationComplete={() => setIsAnimating(false)}
        />
      )}

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center w-full mt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full md:w-1/2 p-5">
          <h1 className="text-4xl font-bold mb-4">Lider de proyecto</h1>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Image
              src="/yo.jpeg"
              alt="Vicente Roa"
              width={700}
              height={500}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
        <section className="w-full md:w-1/3 p-5">
          <h1 className="text-4xl font-bold mb-4 text-yellow-700">Vicente Roa</h1>
          <h3 className="text-2xl font-bold mb-4">Ingeniero en computación e informatica</h3>
          <p className="mb-4">
            Hola tengo 21 años, soy desarrollador de software con experiencia en tecnologías
            modernas y metodologías ágiles, enfocado en la calidad del código y con sólidas
            habilidades en resolución de problemas. Poseo habilidades avanzadas en React , Electron
            , NextJS y Astro. He liderado proyectos independientes que automatizan procesos técnicos
            y mejoran la eficiencia operativa.
          </p>
          <p>
            Doctor Chat fue el proyecto para mi titulación que me ha permitido implementar la
            inteligencia artificial en la medicina. Mi principal objetivo es crear una experiencia
            de usuario diferente y atractiva para los pacientes, que les permita interactuar de
            manera más intuitiva y fácil de usar a la hora de agendar una consulta.
          </p>
          <div className="mt-4 space-x-2">
            <Link href="https://www.linkedin.com/in/vicente-roa-81548b216/" target="_blank">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 transition-colors">
                LinkedIn
              </span>
            </Link>
            <Link href="https://github.com/vicenteroa" target="_blank">
              <span className="bg-gray-700 text-gray-100 text-xs font-medium px-3.5 py-1.5 rounded dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-600 transition-colors">
                Github
              </span>
            </Link>
          </div>
        </section>
      </motion.div>

      <section className="mt-32 px-5">
        <h2 className="text-4xl font-bold mb-8 text-center">Arquitectura Utilizada</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src="/clean_arq.png"
              alt="Arquitectura Limpia"
              width={600}
              height={600}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg">
              La Arquitectura Limpia es un enfoque de diseño de software que separa las
              preocupaciones de una aplicación en capas distintas. Esto permite una mayor
              flexibilidad, mantenibilidad y testabilidad del código. En Doctor Chat, hemos
              implementado esta arquitectura para asegurar un desarrollo sostenible y escalable de
              nuestra aplicación.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-32 px-5">
        <h2 className="text-4xl font-bold mb-8 text-center">Veredicto del jurado</h2>
        <div className="flex justify-center">
          <div className="w-[315px] h-[560px]">
            <iframe
              width="315"
              height="560"
              src="https://www.youtube.com/embed/58xmZ9zi72g"
              title="Presentación del Proyecto Doctor Chat"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>

      <h1 className="text-4xl font-bold mb-8 mt-32 text-center">Preguntas frecuentes</h1>
      <section className="px-5 mb-16">
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">
              ¿Porque seleccionaste la área de la salud ?
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              Elegí el área de la salud porque creo que implementar nuevas tecnologías puede ser un
              gran incentivo para mejorar el servicio en los centros médicos. Actualmente, uno de
              los mayores problemas que enfrentamos en los centros de salud publicas son los largos
              tiempos de espera. Esto me motivó a desarrollar una solución innovadora utilizando la
              tecnología actual y la inteligencia artificial, con la esperanza de reducir
              significativamente estos tiempos y mejorar la experiencia de los pacientes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">¿Que tecnologías utilizas?</AccordionTrigger>
            <AccordionContent className="text-[16px]">
              Para este proyecto las principales tencologias que utilizo son:
              <ul className="list-disc ml-5 mt-2">
                <li>NextJS</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>NestJS</li>
                <li>Firebase</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">
              ¿Que inteligencia artificial utilizas?
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              Utilizo la inteligencia artificial de Gemini para la detección de especialistas segun
              los sintomas que presente el paciente
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl">¿Qué metodología utilizas?</AccordionTrigger>
            <AccordionContent className="text-[16px]">
              En este proyeto estoy utilizando la metología ágil , principalmente la metodología
              SCRUM para el desarrollo de software. esto me ha permitido desarrollar de una forma
              mucho mas eficiente y eficaz.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl">
              ¿ Cuanto tiempo de desarrollo tiene el proyecto?
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              El proyecto tuvo una duración de 6 meses y fue completado con éxito el 05 de diciembre
              del 2024. Obtuve una calificación de 7.0 y el proyecto está 100% terminado.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <FooterPage />
    </div>
  )
}

export default About
