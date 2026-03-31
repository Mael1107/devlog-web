import Link from "next/link";
import { Entry, Tag } from "@/types";
import EntryCard from "./components/entry-card";

const getEntries = async (): Promise<Entry[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`, {
        cache: "no-store",
    })
    return res.json()
}
const getTags = async (): Promise<Tag[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        cache: "no-store",
    })
    return res.json()
}

const Home = async () => {
    const entries = await getEntries()
    const tags = await getTags()

    return (
        <main className="flex mx-5">
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