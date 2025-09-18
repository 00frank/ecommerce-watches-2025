import { useEffect, useRef } from "react";

interface UseDelayProps {
    values: Array<any>,
    delay: number,
    cb: Function
}

export default function useDelay({
    values,
    delay,
    cb
}: UseDelayProps) {
    const timeoutRef = useRef<any>(null)

    useEffect(() => {
        timeoutRef.current = setTimeout(cb, delay)
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, values)

    return timeoutRef
}
