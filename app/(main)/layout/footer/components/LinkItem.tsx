import clsx from "clsx"
import Link from "next/link"
import { memo } from "react"

const LinkItem = memo(({
    name,
    href,
    className
}: { name: string, href: string, className?: string }) => {
    return (
        <li className={clsx(
            "hover:underline text-default-950 hover:text-black transition-colors duration-200  cursor-pointer",
            className
        )}>
            <Link replace href={href}>{name}</Link>
        </li>
    )
})

export default LinkItem