"use client";

import { PublicApi } from "@/app/_hooks/api";
import { SnippetGet } from "@/app/types";
import { useEffect, useState } from "react";
import { MemoedSnippet } from "../snippet/snippet";
import { CreateSnippet } from "../createSnippet/createSnippet";
import { SearchBar } from "../searchBar/searchBar";

export const SnippetGrid = () => {
  const [snippets, setSnippets] = useState<SnippetGet[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await PublicApi.get<SnippetGet[]>("/snippet/");
      setSnippets(res.data);
    };

    load();
  }, []);

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <CreateSnippet />
        <SearchBar />
        <div></div>
      </div>
      <hr></hr>
      <div className="flex min-w-full justify-center items-center">
        <div className="flex flex-wrap gap-2">
          {snippets.map((snippet) => (
            <MemoedSnippet key={snippet._id} snippet={snippet} />
          ))}
        </div>
      </div>
    </div>
  );
};
