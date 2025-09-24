import ProductSortTypes from "./productSort.type"

type SearchParamsKeys = 'sort_by' | "query" | "page"
type SearchParamsArray = 'brand'

export type SearchParams = Partial<
    Record<SearchParamsKeys, string> &
    Record<SearchParamsArray, string[] | string>
    & {
        sort_by: ProductSortTypes
    }
>

