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
            "hover:underline underline-offset-2 text-default-700 hover:text-default-950 transition-colors duration-200  cursor-pointer",
            className
        )}>
            <Link replace href={href}>{name}</Link>
        </li>
    )
})

LinkItem.displayName = "LinkItem"

export default LinkItem