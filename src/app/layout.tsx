import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'a8n',
  description: 'a8n stands for automation.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <Header />
        <main className='grow'>{children}</main>
      </body>
    </html>
  )
}
