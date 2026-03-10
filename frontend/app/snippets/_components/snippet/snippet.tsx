import { SnippetGet } from "../../types";

export const Snippet = (snippet: SnippetGet) => {
    return(
        <div>
            <h2>
                {
                    snippet.title
                }
            </h2>
            <h3>
                {
                    snippet.description
                }
            </h3>
            <div>
                {
                    snippet.tags.map((value, index) => (
                        <div key={index}>
                            {
                                value
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}