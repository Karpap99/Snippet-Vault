

export type SnippetGet = {
    _id: string,
    title: string,
    content: string,
    tags: string[],
    type: string,
    createdAt: Date, 
    updatedAt: Date
}

export type Response = {
    totalPages: number,
    page: number,
    snippet: SnippetGet | SnippetGet[]
}



export type SnippetCreate = {
    title: string,
    content: string,
    tags: string[],
    type: string,
}