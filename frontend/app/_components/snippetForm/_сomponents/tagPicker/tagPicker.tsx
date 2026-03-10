"use client";

import { useState } from "react";
import { Props } from "./types";
import Image from "next/image";
import Close from "@/assets/images/close.svg"

export const TagPicker = ({ initialValue }: Props) => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>(initialValue || []);


  const handleTagAdd = () => {
    const trimmed = tag.trim()
    if(trimmed && !tags.includes(trimmed)){
        setTags(prev => [...prev, trimmed])
        setTag("")
    }
  };

  const handleTagDelete = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <>
      <input type="hidden" name="tags" value={tags?.join(",")} />
      <div>
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          className="border-1 px-[5px] py-[5px]"
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
      <div className="flex">
        {tags.map((value) => (
          <div key={value} className="flex items-center p-[2px] border-1 rounded-[4px]">
            {value}
            <div onClick={() => handleTagDelete(value)}>
              <Image height={24} width={24} src={Close} alt=""/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
