"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const SearchBar = () => {
    const q = useSearchParams()
    const router = useRouter()
    const [inputSearch, setInputSearch] = useState<string>(q.get("search") ?? "")

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault()
        router.replace(`?search=${inputSearch}`)
    }

    return (
        <form 
            onSubmit={handleSearch}
            className="flex mt-15 self-center gap-2 md:gap-5"
        >
            <input 
                className="outline-none p-2 rounded-xl border-2 border-blue-900 text-lg font-semibold text-blue-800 shadow-md focus:bg-indigo-100 w-50 md:w-80 lg:w-150 transition-[width] duration-300"
                type="text" 
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                placeholder="Search for the log title"
            />
            <button 
                type="submit"
                className="hover:cursor-pointer p-2 bg-indigo-500 text-white font-bold text-lg rounded-xl hover:bg-indigo-600 hover:text-blue-100 shadow-md w-10  md:w-25 transition-[width] duration-300 hover:transition-colors hover:duration-200" 
            >
                <span className="hidden md:inline">Search</span>

                <Search className="md:hidden" size={25} />
            </button>
        </form>
    )

}

export default SearchBar