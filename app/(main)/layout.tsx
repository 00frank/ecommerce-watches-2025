import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../globals.css";
import Footer from "./common/layout/footer";
import Header from "./common/layout/Header.layout";
import Navbar from "./common/layout/navbar";
import WhatsAppFloat from "./common/layout/WhatsAppFloat.layout";
import ProductSearchProvider from "./common/provider/ProductSearch.provider";
import AppConfigProvider from "./common/provider/AppConfig.provider";
import ConfigurationsQuery from "@/lib/supabase/queries/configurations.query";
import { createClient } from "@/lib/supabase/server";
import ScrollToTop from "./common/layout/ScrollToTop";


const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Pilas, Relojes y partes | Importadora La Unión",
  description: "Descubre pilas, relojes y partes en Importadora La Unión. Calidad, estilo y los mejores precios en relojería.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const config = await ConfigurationsQuery.getConfiguration(await createClient())

  return (
    <html lang="es">
      <body
        className={`${lato.className} antialiased bg-primary-400`}
      >
        <AppConfigProvider config={config}>
          <ProductSearchProvider>
            <Header />
            <Navbar />
            <ScrollToTop />
            {children}
            <Footer />
            <WhatsAppFloat />
          </ProductSearchProvider>
        </AppConfigProvider>
      </body>
    </html>
  );
}
