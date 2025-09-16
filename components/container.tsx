import clsx from "clsx"
import { JSX } from "react"

interface ContainerProps {
    children: React.ReactNode
    className?: string
    as?: keyof JSX.IntrinsicElements
}

export default function Container({ children, className, as }: ContainerProps) {
    const Component = as || "div"
    return (
        <Component className={clsx("max-w-7xl w-full mx-auto px-4 md:px-8", className)}>
            {children}
        </Component>
    )

}