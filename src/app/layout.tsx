import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

type LayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full flex h-dvh">
          <Sidebar />
          <Providers>{children}</Providers>
        </div>
      </body>
      <Toaster />
    </html>
  )
}
