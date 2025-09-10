import SearchProductModal from "@/components/SearchProduct.component";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full bg-primary-800 text-center py-2">
      <p className="text-white text-sm">VENTA MAYORISTA - ENVÍOS A TODO EL PAÍS</p>
    </div>
  )
}

const Navbar = () => {
  return (
    <div className="w-full justify-around py-4  flex items-center ">
      <span></span>
      <Image
        src={"/logo.png"}
        alt="Logo"
        width={200}
        height={200}
      />
      <SearchProductModal />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
    </>
  );
}
