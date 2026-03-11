"use client";

import { useState } from "react";
import { Props } from "./types";
import Image from "next/image";
import Close from "@/assets/images/close.svg";

export const TagPicker = ({ initialValue, error, setError }: Props) => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>(initialValue || []);
  const [errorMsg, setErrorMsg] = useState<string>(error);

  const handleTagAdd = () => {
    const trimmed = tag.trim();
    if (trimmed.length == 0) {
      setError("Tag name cannot be empty")
      setErrorMsg("Tag name cannot be empty");
      return;
    }
    if(tags.includes(trimmed)){
      setError("Can't duplicate tags")
      setErrorMsg("Can't duplicate tags");
      return;
    }
    setError("")
    setErrorMsg("");
    setTags((prev) => [...prev, trimmed]);
    setTag("");
  };

  const handleTagDelete = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div>
      <input type="hidden" name="tags" value={tags?.join(",")} />
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          className="border-1 px-[5px] py-[5px] w-full"
          onChange={(e) => setTag(e.target.value)}
        ></input>
        <button
          type="button"
          className="bg-color-gray px-[5px] py-[5px]"
          onClick={handleTagAdd}
        >
          Add
        </button>
      </div>
      <div>
        <p className="text-red-800 text-[12px]">{errorMsg}</p>
      </div>
      

      <div className="flex flex-wrap gap-[2px]">
        {tags.map((value) => (
          <div
            key={value}
            className="flex items-center p-[2px] border-1 rounded-[4px] "
          >
            {value}
            <div onClick={() => handleTagDelete(value)}>
              <Image height={24} width={24} src={Close} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
