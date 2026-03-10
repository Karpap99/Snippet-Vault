"use client";

import { PublicApi } from "@/app/_hooks/api";
import { SnippetGet, Response } from "@/app/types";
import { useState, useEffect } from "react";
import { CreateSnippet } from "../createSnippet/createSnippet";
import { SearchBar } from "../searchBar/searchBar";
import { MemoedSnippet } from "../snippet/snippet";
import { AxiosResponse } from "axios";

export const SnippetGrid = () => {
  const [snippets, setSnippets] = useState<SnippetGet[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9)

  const addSnippet = (snippet: SnippetGet) => {
    if(page === pages)
        setSnippets((prev) => [...prev, snippet]);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res: AxiosResponse<Response> = await PublicApi.get<Response>(
          "/snippet",
          {
            params: {
              q: search,
              limit: limit,
              page: page,
              
            },
          },
        );
        setSnippets(res.data.snippet);
        setPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [search, page, limit]);

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center max-w-[1440px] min-w-[1024px] mx-auto">
        <div className="flex-1">
            <CreateSnippet onAddSuccess={addSnippet} />
        </div>
        
        <SearchBar onChange={setSearch} value={search} />
        <div className="flex-1">
            <div>
                <ul className="flex gap-1">
                    <li onClick={() => {
                        setLimit(9) 
                        setPage(1)}}>9</li>
                    <li onClick={() => {
                        setLimit(12) 
                        setPage(1)}}>12</li>
                    <li onClick={() => {
                        setLimit(15) 
                        setPage(1)}}>15</li>
                </ul>
            </div>
        </div>
      </div>

      <hr />

      <div className="flex justify-center w-full">
        <div className={`grid grid-cols-3 grid-rows-${limit/3} justify-center gap-2 max-w-[1024px]`}>
          {snippets.length > 0 ? (
            snippets.map((snippet) => (
              <MemoedSnippet key={snippet._id} snippet={snippet} />
            ))
          ) : (
            <p>No result</p>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-center">
        <ul className="flex gap-3">
          {Array.from({ length: pages }).map((value, index) => (
            <li 
                key={index} 
                onClick={() => setPage(index + 1)}
                className={`select-none cursor-pointer flex items-center justify-center p-5 border rounded-full h-12 w-12 text-center text-white ${
                    page === index + 1 ? "bg-gray-400" : "bg-gray-800"
                }`}
            >
                {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
