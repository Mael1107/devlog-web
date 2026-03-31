"use client"

import { Tag } from "@/types"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
    tags: Tag[]
}

const EntryForm = ({tags}: Props) => {
    const router = useRouter()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [selectedTags, setSelectedtags] = useState<number[]>([])
    const [error, setError] = useState<string>("")

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (title.trim() === "" || content.trim() === "" || date.trim() === "") {
            setError("Error! Fill in correctly and try again!")
            return
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                entry: {title, content, date, tag_ids: selectedTags},
            }),
        })

        router.push("/")
        router.refresh()
    }

    const toggleTag = (tagId: number) => {
        setSelectedtags(prev => 
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }



    return (
        <form
            className="flex flex-col gap-5 bg-indigo-100 rounded-xl p-10 shadow-inner w-150 mt-25"
            onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <h1 className="text-center text-4xl font-bold text-blue-800">Create Log</h1>
            <input
            className="border-b-2 border-blue-900 outline-none text-lg focus:border-b-3 focus:bg-indigo-200 p-1 rounded-md text-blue-800 transition" 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter here the title..."
            />
            <input
            className="border-b-2 border-blue-900 outline-none text-lg focus:border-b-3 focus:bg-indigo-200 p-1 rounded-md text-blue-800 transition" 
            type="text" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter here the content..."
            />
            <input
            className="self-center hover:cursor-pointer bg-indigo-200 p-1 px-4 rounded-lg"
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter here the date(ex: 00/00/00)..."
            />
            <div className="flex justify-around">
                {tags.map(tag => (
                    <button
                        className="hover:cursor-pointer p-1.5 rounded-lg text-blue-800 font-mono"
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        style={{backgroundColor: selectedTags.includes(tag.id) ? tag.color : "#C7D2FE"}}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
            <button 
            className="hover:cursor-pointer bg-indigo-300 py-1.5 w-80 text-lg font-bold text-blue-900 rounded-xl self-center hover:bg-indigo-400 hover:text-blue-700 transition-colors" 
            type="submit">
                Created
            </button>
        </form>
    )
}

export default EntryForm
