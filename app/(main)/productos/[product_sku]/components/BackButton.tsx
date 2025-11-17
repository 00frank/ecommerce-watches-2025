"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="h-6 flex cursor-pointer gap-2" onClick={() => router.back()}>
      <ArrowLeft />
      <span className="underline md:no-underline hover:underline">Volver atras</span>
    </div>
  )
}
