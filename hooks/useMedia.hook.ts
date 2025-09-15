"use client"
import { useEffect, useState } from "react";

type UseMediaProps = {
    query: `(min-width:${string})` | `(max-width:${string})`
    onMediaChange?: (matches: boolean) => void
}

export default function useMedia({ query, onMediaChange }: UseMediaProps) {
    const [isMd, setIsMd] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia(query)
        setIsMd(mq.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setIsMd(e.matches);
            onMediaChange?.(e.matches);
        };
        mq.addEventListener("change", handleChange);
        return () => mq.removeEventListener("change", handleChange);
    }, [])

    return isMd
}