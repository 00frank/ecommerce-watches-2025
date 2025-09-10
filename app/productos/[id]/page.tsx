"use client"
import { useParams, useRouter } from "next/navigation"


export default function ProductPage() {

    const router = useParams()

    return (
        <div>
            <p>{router.id}</p>
        </div>
    )
}