"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowUpDown } from "lucide-react"

const SortControls = () => {
    const q = useSearchParams()
    const router = useRouter()
    const [sort, setSort] = useState<string>("date")
    const [order, setOrder] = useState<string>("asc")

    const handleSort = () => {
        if (sort && order) {
            const params = new URLSearchParams(q.toString())
            params.set("sort_by", sort)
            params.set("order", order)

            router.replace(`?${params.toString()}`)
        }
        
    }

    return (
        <div className="flex gap-2 self-center mt-5 text-xl font-semibold p-2 px-4 bg-indigo-200 rounded-xl">
            <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="hover:cursor-pointer text-blue-900"
            >
                <option value="date">Date</option>
                <option value="title">Title</option>
            </select>

            <select 
                value={order} 
                onChange={(e) => setOrder(e.target.value)}
                className="hover:cursor-pointer text-blue-900"
            >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
            <button
                type="button"
                onClick={handleSort}
            >
                <ArrowUpDown className="hover:cursor-pointer text-blue-900" size={24} strokeWidth={2.2} />
            </button>
            
        </div>
    )
}

export default SortControls