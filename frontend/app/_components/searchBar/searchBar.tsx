"use client"

import { ChangeEvent } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: Props) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for title, description, tags"
        className="border-1 py-1 px-2 w-[400px]"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}