import { Inter } from 'next/font/google';

import "../../globals.css";
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
    children
  );
}
