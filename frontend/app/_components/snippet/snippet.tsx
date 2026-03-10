"use client";

import { memo } from "react";
import { SnippetGet } from "../../types";

type Props = {
  snippet: SnippetGet;
};

const Snippet = ({ snippet }: Props) => {
  return (
    <div className="flex flex-col border-1 border-gray-300  px-2 w-[300px] rounded-xs">
      <div className="flex justify-between">
        <div>
          <h2>{snippet.title}</h2>
          <h3>{snippet.description}</h3>
        </div>

        <p>{snippet.type}</p>
      </div>
      <div>
        {snippet.tags.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
    </div>
  );
};

export const MemoedSnippet = memo(Snippet);
