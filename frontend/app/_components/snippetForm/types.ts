import { SnippetCreate} from "../../types"

export type Props = {
    onSubmit: (snippetData: SnippetCreate) => void
    defaultValues: SnippetCreate
}