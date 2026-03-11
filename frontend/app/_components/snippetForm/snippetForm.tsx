import { TagPicker } from "./_сomponents/tagPicker/tagPicker";
import { SnippetCreate, SnippetGet } from "../../types";
import { Props, SnippetErrors } from "./types";
import { useState } from "react";

export const SnippetForm = ({ onSubmit, defaultValues }: Props) => {
  const [errors, setErrors] = useState<SnippetErrors>({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {


    e.preventDefault();


    const formData = new FormData(e.currentTarget);

    const data: SnippetCreate = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tags: (formData.get("tags") as string).split(","),
      type: formData.get("type") as SnippetCreate["type"],
    };

    const newErrors: SnippetErrors = {title: "", content: "", tags: ""};

    if (data.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (data.content.trim().length < 3) {
      newErrors.content = "Content must be at least 3 characters";
    }


    if (newErrors.title.length > 0 || newErrors.content.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({title: "", content: "", tags: ""});

    

    onSubmit(data);
  };

  return (
    <div>
      <form className="flex flex-col gap-[10px] my-2 w-[400px]" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border-1 px-[5px] py-[5px] w-full"
            defaultValue={defaultValues.title}
          />
          <p className="text-[12px] text-red-800">
            {
                errors.title
            }
          </p>
        </div>

        <div>
          <textarea
            placeholder="Content"
            name="content"
            className="border-1 px-[5px] py-[5px] w-full"
            defaultValue={defaultValues.content}
          />
          <p className="text-[12px] text-red-800">
            {
                errors.content
            }
          </p>
        </div>

        <TagPicker error={errors.tags} initialValue={defaultValues.tags} setError={(error) => setErrors(prev => ({ ...prev, tags: error }))} />
        <select name="type" defaultValue={defaultValues.type}>
          <option value="link">Link</option>
          <option value="note">Note</option>
          <option value="command">Command</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
