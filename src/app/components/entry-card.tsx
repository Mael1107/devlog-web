"use client"
import { Entry, Tag } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EntryCard = ({entry, allTags}:{entry: Entry, allTags: Tag[]}) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editTitle, setEditTitle] = useState<string>(entry.title)
    const [editContent, setEditContent] = useState<string>(entry.content)
    const [editDate, setEditDate] = useState(entry.date)
    const [selectedTags, setSelectedTags] = useState<number[]>(entry.tags.map(t => t.id))
    
    const handleDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries/${entry.id}`, {
            method: "DELETE",
        })
        router.refresh()
    }

    const handleEdit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries/${entry.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                entry: {title: editTitle, content: editContent, date: editDate, tag_ids: selectedTags,},
            }),
        })
        setIsEditing(false)
        router.refresh()
    }

    const toggleTag = (tagId: number) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    

    if (!isEditing) return (
        <li className="flex flex-col gap-1 bg-indigo-200 p-4 rounded-xl shadow-inner">
            <h1 className="text-2xl font-bold text-blue-900">{entry.title}</h1>
            <p className="text-xl font-mono text-zinc-600">{entry.date}</p>
            <p className="text-xl text-blue-900 font-semibold">{entry.content}</p>
            <div className="flex gap-2">
                {entry.tags.map(tag => (
                    <span className="text-blue-900 font-md text-xl" key={tag.id}>{tag.name}</span>
                ))}
            </div>
            <div className="flex gap-3 mt-3">
                <button
                className="text-lg font-semibold bg-indigo-300 text-blue-800 p-1 px-5 hover:cursor-pointer rounded-xl hover:bg-indigo-400 hover:text-blue-200 transition-colors"onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <button
                className="text-lg font-semibold bg-red-500 text-indigo-50 rounded-xl p-1 px-3 hover:cursor-pointer hover:bg-red-700 hover:text-indigo-100 self-start transition-colors"
                onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    )

    return (
        <li className="flex flex-col gap-3 bg-indigo-200 p-4 rounded-xl shadow-inner">
            <input
            className="text-2xl p-2 outline-none border-b-2 border-blue-900 text-blue-800 font-bold rounded-sm w-sm focus:border-b-3 focus:bg-indigo-300 transition "
            type="text" 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Enter here the new title..."
            />
            <input 
            className="text-xl p-2 outline-none border-b-2 border-blue-900 text-blue-800 font-semibold rounded-sm w-sm focus:border-b-3 focus:bg-indigo-300 transition "
            type="text" 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Enter here the new content..."
            />
            <input
            className="hover:cursor-pointer text-md self-start bg-indigo-300 p-1 px-4 rounded-xl"
            type="date" 
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            placeholder="Enter here the new date..."
            />
            <div className="flex gap-2">
                {allTags.map(tag => (
                    <button
                        key={tag.id}
                        className="hover:cursor-pointer p-1 rounded-lg font-semibold text-md text-blue-900"
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        style={{
                            backgroundColor: selectedTags.includes(tag.id) ? tag.color : "#a5b4fc"
                        }}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
            <div className="flex gap-3">
                <button 
                    className="hover:cursor-pointer text-lg font-semibold bg-indigo-300 p-2 rounded-xl hover:bg-indigo-400 transition-colors text-blue-800 hover:text-blue-200" 
                    onClick={handleEdit}>
                    Save
                </button>
                <button 
                className="hover:cursor-pointer text-lg font-semibold bg-indigo-300 p-2 rounded-xl hover:bg-indigo-400 transition-colors text-blue-800 hover:text-blue-200"
                onClick={() => setIsEditing(false)}>
                    Cancel
                </button>
            </div>
        </li>
    )
}

export default EntryCard
