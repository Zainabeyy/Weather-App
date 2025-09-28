import { ThemeProvider } from "next-themes";
import React from "react";

export function DarkModeProviders({children}:{children:React.ReactNode}){
    return(
       <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>{children}</ThemeProvider>
    )
}