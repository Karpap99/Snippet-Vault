

export type SnippetGet = {
    _id: string,
    title: string,
    content: string,
    tags: string[],
    type: string,
    createdAt: Date, 
    updatedAt: Date
}

export type ResponseSignle = {
    totalPages: number,
    page: number,
    snippet: SnippetGet
}

export type ResponseMany = {
    totalPages: number,
    page: number,
    snippet: SnippetGet[]
}



export type SnippetCreate = {
    title: string,
    content: string,
    tags: string[],
    type: string,
}