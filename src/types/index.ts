export type Tag = {
    id: number
    name: string
    color: string
}

export type Entry = {
    id: number
    title: string
    content: string
    date: string
    tags: Tag[]
}