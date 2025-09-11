import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Panel de Administración',
  description: 'Panel de administración de la tienda de relojes',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-white`}>
        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
