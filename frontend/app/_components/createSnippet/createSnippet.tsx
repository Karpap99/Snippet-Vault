"use client"

import { useState } from "react"
import { Modal } from "../modal/modal"
import { SnippetForm } from "../snippetForm/snippetForm"
import { SnippetCreate, SnippetGet } from "../../types"
import { PublicApi } from "@/app/_hooks/api"


type Props = {
    onAddSuccess: (snippet: SnippetGet) => void
}

export const CreateSnippet = ({onAddSuccess}:Props) => {
    const [formIsOpen, setFormIsOpen] = useState<boolean>(false)
    const [snippet, SetSnippet] = useState<SnippetCreate>({title: "", content: "", tags:[], type:"note"})


    const handleFormOutput = async (output: SnippetCreate) =>{
        try{
            const result = await PublicApi.post("/snippet", output)
            onAddSuccess(result.data.snippet)
            setFormIsOpen(false)
        }
        catch{

        }
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