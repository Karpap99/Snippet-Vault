import { useState } from "react"


export const SearchBar = () => {
    const [value, setValue] = useState<string>('')


    return(
        <div className="relative">
            <input 
                type="text" 
                placeholder="Search for title, description, tags"
                className="border-1 py-1 px-2
                          w-[400px]"
                />

        </div>
    )
}