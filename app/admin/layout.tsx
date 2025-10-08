import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner"

import "../globals.css"
const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}