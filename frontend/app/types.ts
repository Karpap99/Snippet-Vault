

export type SnippetGet = {
    _id: string,
    title: string,
    description: string,
    tags: string[],
    type: string,
    createdAt: Date, 
    updatedAt: Date
}


export type SnippetCreate = {
    title: string,
    description: string,
    tags: string[],
    type: string,
}