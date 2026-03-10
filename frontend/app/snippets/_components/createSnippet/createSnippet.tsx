import { PublicApi } from "@/app/_hooks/api"
import { TagPicker } from "./_сomponents/tagPicker/tagPicker"
import { SnippetCreate } from "../../types"

export const CreateSnippet = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: SnippetCreate = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            tags: (formData.get("tags") as string).split(","),
            type: formData.get("type") as SnippetCreate["type"]
        }

        const result = await PublicApi.post('/snippet', data)
        
        console.log(result)
    }

    return(
        <div>
            <form className="flex flex-col gap-[10px] my-2" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" className="border-1 px-[5px] py-[5px]"></input>
                <textarea placeholder="Description" name="description" className="border-1 px-[5px] py-[5px]"></textarea>
                <TagPicker/>
                <select name="type">
                    <option value="link">Link</option>
                    <option value="note">Note</option>
                    <option value="command">Command</option>
                </select>
                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}