import { Tag } from "@/types";
import EntryForm from "@/app/components/entry-form";

const getTags = async ():Promise<Tag[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        cache: "no-store",
    })
    return res.json()
}

const NewEntry = async () => {
    const tags = await getTags()

    return (
        <div className="flex justify-center items-center">
            <EntryForm tags={tags} />
        </div>
    )
}

export default NewEntry