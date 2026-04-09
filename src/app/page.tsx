import { Entry, Tag } from "@/types";
import EntryCard from "./components/entry-card";
import SearchBar from "./components/search-bar"; 
import SortControls from "./components/sort-controls";

const getEntries = async (search?: string, sort_by?: string, order?: string): Promise<Entry[]> => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (sort_by) params.set("sort_by", sort_by)
    if (order) params.set("order", order)
    
    const query = params.toString()
    const url = `${process.env.NEXT_PUBLIC_API_URL}/entries${query ? `?${query}` : ""}`

    const res = await fetch(url, {cache: "no-store"})
    return res.json()
}
const getTags = async (): Promise<Tag[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        cache: "no-store",
    })
    return res.json()
}

type Props = {
    searchParams: Promise<{ search?: string, sort_by?: string, order?: string }>
}

const Home = async ({searchParams}: Props) => {
    const params = await searchParams
    const entries = await getEntries(params.search, params.sort_by, params.order)

    const tags = await getTags()

    return (
        <main className="flex flex-col mx-5">
            <SearchBar />
            <SortControls />
            <ul className="grid grid-cols-1 bg-indigo-100 p-6 py-8 rounded-xl shadow-lg gap-5 mt-20 w-full">
                {entries.length === 0 && (
                    <h1 className="text-3xl font-bold text-center text-blue-800">No logs added yet!</h1>
                )}
                {entries.map(entry => (
                    <EntryCard 
                        key={entry.id} 
                        entry={entry}
                        allTags={tags}
                    />
                ))}
            </ul>

        </main>
    )
}

export default Home