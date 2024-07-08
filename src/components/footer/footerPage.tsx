import Link from 'next/link'
export default function FooterPage() {
  return (
    <footer className="bg-muted p-6 md:py-12 w-full dark:bg-zinc-900">
      <div className="container max-w-7xl flex items-center justify-between">
        <Link href="#" className="flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">DoctorChat</span>
        </Link>
        {/* <nav className="flex items-center space-x-4 text-sm"> */}
        {/*   <Link href="#" className="hover:underline underline-offset-4" prefetch={false}> */}
        {/*     About */}
        {/*   </Link> */}
        {/*   <Link href="#" className="hover:underline underline-offset-4" prefetch={false}> */}
        {/*     Products */}
        {/*   </Link> */}
        {/*   <Link href="#" className="hover:underline underline-offset-4" prefetch={false}> */}
        {/*     Contact */}
        {/*   </Link> */}
        {/*   <Link href="#" className="hover:underline underline-offset-4" prefetch={false}> */}
        {/*     Privacy */}
        {/*   </Link> */}
        {/* </nav> */}
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Doctor Chat. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brain"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
      <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
      <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
    </svg>
  )
}
