"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:cursor-pointer text-lg text-blue-900 "
        >
            {theme === "dark"
                ? <Sun className="bg-indigo-200 p-2 rounded-full" strokeWidth={3} size={43} />
                : <Moon className="bg-indigo-200 p-2 rounded-full" strokeWidth={3} size={43} />
            }
        </button>
    )
}

export default ToggleTheme