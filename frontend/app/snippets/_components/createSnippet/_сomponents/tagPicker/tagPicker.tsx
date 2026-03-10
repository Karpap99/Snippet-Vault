"use client"

import { useState } from "react"

export const  TagPicker = () => {
    const [tag, setTag] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])

    const handleTagAdd = () => {
        if(tag.length > 0 && !tags.includes(tag)){
            setTags(prev => [...prev, tag.trim()])
            setTag("")
        }
    }

    const handleTagDelete = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag))
    }


    return(
        <>
            <input type="hidden" name="tags" value={tags?.join(",")} />

            <div>
                <input type="text" placeholder="Tag" value={tag} className="border-1 px-[5px] py-[5px]" onChange={e => setTag(e.target.value)}></input>
                <button type="button" className="bg-color-gray px-[5px] py-[5px]" onClick={handleTagAdd}>Add</button>
            </div>
            
            <div>
                {
                    tags.map((value, index) => (
                        <div key={index}>
                            {
                                value
                            }
                            <button
                                type="button"
                                onClick={
                                    () => handleTagDelete(value)
                                }
                            >
                                del
                            </button>
                        </div>
                    ))
                }
            </div>

        </>
    )
}