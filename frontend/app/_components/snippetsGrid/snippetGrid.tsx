"use client";

import { PublicApi } from "@/app/_hooks/api";
import { SnippetGet, ResponseMany } from "@/app/types";
import { useState, useEffect, useCallback } from "react";
import { CreateSnippet } from "../createSnippet/createSnippet";
import { SearchBar } from "../searchBar/searchBar";
import { MemoedSnippet } from "../snippet/snippet";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Close from "@/assets/images/close.svg";

export const SnippetGrid = () => {
  const [snippets, setSnippets] = useState<SnippetGet[]>([]);
  const [snippetsSorted, setSnippetsSorted] = useState<SnippetGet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);

  const [sortBy, setSortBy] = useState<string>("default");

  const sort = useCallback(() => {
    if (sortBy === "default") {
      setSnippetsSorted([...snippets]);
    } else {
      setSnippetsSorted((prev) =>
        [...prev].sort((a, b) => {
          if (sortBy === "date-ascend") {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          } else if (sortBy === "date-descend") {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          } else if (sortBy === "last-updated") {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          } else {
            return 0;
          }
        }),
      );
    }
  }, [sortBy, snippets]);

  const [tag, setTag] = useState<string>("");

  const addSnippet = (snippet: SnippetGet) => {
    if (page === pages && snippets.length < limit) {
      setSnippets((prev) => [...prev, snippet]);
      setSnippetsSorted([...snippets]);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res: AxiosResponse<ResponseMany> = await PublicApi.get<ResponseMany>(
          "/snippet",
          {
            params: {
              q: search,
              limit: limit,
              page: page,
              tag: tag,
            },
          },
        );
        setSnippets(res.data.snippet);
        setSnippetsSorted(res.data.snippet);
        setPages(res.data.totalPages);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    };

    load();
  }, [search, page, limit, tag]);

  useEffect(() => {
    const load = () => {
      setPage(1);
    };

    load();
  }, [search, limit, tag]);

  useEffect(() => {
    const load = () => {
      sort();
    };

    load();
  }, [sort]);

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center max-w-[1440px] min-w-[1024px] mx-auto">
        <div className="flex-1">
          <CreateSnippet onAddSuccess={addSnippet} />
        </div>

        <SearchBar onChange={setSearch} value={search} />
        <div className="flex-1 flex gap-5 justify-end">
          {tag.length > 0 && (
            <div className="flex justify-center items-center">
              {tag}
              <Image
                src={Close}
                alt=""
                width={16}
                height={16}
                onClick={() => setTag("")}
              />
            </div>
          )}
          <div>
            <ul className="flex gap-1">
              <li onClick={() => setLimit(9)}>9</li>
              <li onClick={() => setLimit(12)}>12</li>
              <li onClick={() => setLimit(15)}>15</li>
            </ul>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.currentTarget.value)}
          >
            <option value="default">default</option>
            <option value="date-ascend">date ascend</option>
            <option value="date-descend">date descend</option>
            <option value="last-updated">last updated</option>
          </select>
        </div>
      </div>

      <hr />

      <div className="flex justify-center w-full">
        <div className={`grid grid-cols-3 justify-center gap-2 max-w-[1024px]`}>
          {isLoading ? (
            <p>Is loading</p>
          ) : Error.length > 0 ? (
            <p>Error: {Error} </p>
          ) : snippets.length > 0 ? (
            snippetsSorted.map((snippet) => (
              <MemoedSnippet
                key={snippet._id}
                snippet={snippet}
                setTag={(tag) => setTag(tag)}
              />
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
