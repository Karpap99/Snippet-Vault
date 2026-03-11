"use client";

import { memo } from "react";
import { SnippetGet } from "../../types";
import { redirect, RedirectType } from "next/navigation";

type Props = {
  snippet: SnippetGet;
  setTag: (tag: string) => void
};

const Snippet = ({ snippet, setTag }: Props) => {
  return (
    <div
      className="flex flex-col border-1 border-gray-300  
                   px-[5px] py-[2px] w-[300px] h-[120px] rounded-[5px] justify-between"
    >
      <div 
        onClick={() => redirect(`/${snippet._id}`, RedirectType.push)}
        className="min-w-full overflow-hidden">
        <h2>{snippet.title}</h2>
        <hr></hr>
        <p className="text-[14px]/[16px] text-wrap break-all">
          {snippet.content}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 overflow-hidden">
          {snippet.tags.map((value, index) => (
            <p
              key={index}
              className="bg-gray-300 rounded-[2px] px-[2px] text-[11px]"
              onClick={()=>setTag(value)}
            >
              {value}
            </p>
          ))}
        </div>
        <p>{snippet.type}</p>
      </div>
    </div>
  );
};

export const MemoedSnippet = memo(Snippet);
