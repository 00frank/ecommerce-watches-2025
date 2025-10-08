"use client"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PaginationInfo } from "@/types/paginationInfo.interface";
import { useSearchParams } from "next/navigation";

const RANGE = 2
const OFFSET = 1 //Este offset es la compensacion de los lados estaticos.
const ABSOLUTE_RANGE = RANGE + OFFSET

const getPagination = ({ current_page, total_pages }: PaginationInfo) => {

    const visiblePages: number[] = []

    /**
     * El current page viene en formato de index.
     */

    const rangeStart = Math.max(OFFSET, current_page - RANGE)
    const rangeEnd = Math.min(total_pages - OFFSET, current_page + RANGE)

    for (let i = rangeStart; i <= rangeEnd; i++) {
        visiblePages.push(i)
    }

    const ellipsisStart = current_page > ABSOLUTE_RANGE
    const ellipsisEnd = current_page < (total_pages - ABSOLUTE_RANGE)

    return {
        visiblePages,
        ellipsisStart,
        ellipsisEnd
    }
}

export default function PaginationProducts({
    pagination_info
}: {
    pagination_info: PaginationInfo
}) {

    const searchParams = useSearchParams()

    if (pagination_info.total_pages == 0) return

    const { current_page, total_pages } = pagination_info

    const { visiblePages, ellipsisStart, ellipsisEnd } = getPagination(pagination_info)


    const handlePageChange = (page: number) => {
        const current = new URLSearchParams(searchParams)
        current.set("page", page.toString())
        return `?${current.toString()}`
    }

    const previousPage = () => {
        if (current_page == 0) return ""
        return handlePageChange(current_page - 1)
    }

    const nextPage = () => {
        if (current_page == total_pages) return ""
        return handlePageChange(current_page + 1)
    }

    return (
        <Pagination>
            <Pagination>
                <PaginationContent>
                    <PaginationItem className={current_page == 0 ? "hidden" : ""}>
                        <PaginationPrevious href={previousPage()} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            isActive={current_page === 0}
                            href={handlePageChange(0)}>
                            1
                        </PaginationLink>
                    </PaginationItem>

                    {
                        ellipsisStart && <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    {visiblePages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === current_page}
                                href={handlePageChange(page)}>
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {
                        ellipsisEnd && <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    <PaginationItem>
                        <PaginationLink
                            isActive={current_page === total_pages}
                            href={handlePageChange(total_pages)}>
                            {total_pages + 1}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={current_page == total_pages ? "hidden" : ""}>
                        <PaginationNext href={nextPage()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Pagination>
    )
}