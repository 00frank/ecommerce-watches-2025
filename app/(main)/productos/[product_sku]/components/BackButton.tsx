"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="absolute h-6 flex gap-2 md:hidden underline" onClick={() => router.back()}>
      <ArrowLeft />
      Volver atras
    </div>
  )
}
