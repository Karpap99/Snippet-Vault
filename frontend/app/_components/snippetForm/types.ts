import { SnippetCreate} from "../../types"

export type Props = {
    onSubmit: (snippetData: SnippetCreate) => void
    defaultValues: SnippetCreate
}

export type SnippetErrors = {
    title: string,
    content: string,
    tags: string
}