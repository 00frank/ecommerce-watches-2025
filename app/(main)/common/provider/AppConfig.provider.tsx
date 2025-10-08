"use client"
import { ConfigurationsType } from "@/types/configurations.type"
import { createContext, useContext } from "react"

const AppConfigContext = createContext<ConfigurationsType>({} as ConfigurationsType)

export const useAppConfigContext = () => {
    return useContext(AppConfigContext)
}

export default function AppConfigProvider({ children, config }: { children: React.ReactNode, config: ConfigurationsType }) {

    return (
        <AppConfigContext.Provider value={config}>
            {children}
        </AppConfigContext.Provider>
    )
}