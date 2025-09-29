"use client"
import { createContext, useContext, useState } from "react"

const createProductSearchContext = createContext({
    search: "",
    setSearch: (s: string) => { }
})

export const useProductSearchContext = () => {
    return useContext(createProductSearchContext)
}

const getSearchQuery = () => {
    //Solo se ejecuta un sola vez al montarse la web.
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get("search") || ""
}


export default function ProductSearchProvider({ children }: { children: React.ReactNode }) {

    const [search, setSearch] = useState(() => getSearchQuery())

    return (
        <createProductSearchContext.Provider value={{
            search,
            setSearch
        }}>
            {children}
        </createProductSearchContext.Provider>
    )
}