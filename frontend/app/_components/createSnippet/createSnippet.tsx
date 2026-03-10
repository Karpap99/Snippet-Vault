"use client"

import { useState } from "react"
import { Modal } from "../modal/modal"
import { SnippetForm } from "../snippetForm/snippetForm"
import { SnippetCreate } from "../../types"
import { PublicApi } from "@/app/_hooks/api"


export const CreateSnippet = () => {
    const [formIsOpen, setFormIsOpen] = useState<boolean>(false)
    const [snippet, SetSnippet] = useState<SnippetCreate>({title: "", description: "", tags:[], type:"note"})


    const handleFormOutput = async (output: SnippetCreate) =>{
        const result = await PublicApi.post("/snippet", output)
        
        setFormIsOpen(false)
    }

    return(
        <>
            <button 
                className="border-1 rounded p-2"
                onClick={() => setFormIsOpen(true)}>
                Add snippet
            </button>
            <Modal open={formIsOpen} onClose={() => setFormIsOpen(false)}>
                <SnippetForm defaultValues={snippet} onSubmit={handleFormOutput}/>
            </Modal>
        </>
    )
}