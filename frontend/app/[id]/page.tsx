"use client";

import { useEffect, useState } from "react";
import { SnippetCreate, SnippetGet, Response } from "../types";
import { PublicApi } from "../_hooks/api";
import { AxiosResponse } from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Delete from "@/assets/images/delete.svg";
import Edit from "@/assets/images/edit.svg";
import { Modal } from "../_components/modal/modal";
import { SnippetForm } from "../_components/snippetForm/snippetForm";

export default function Page() {
  const [snippet, setSnippet] = useState<SnippetGet>();
  const pathname = usePathname();

  const [modalShow, setModalShow] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const result: AxiosResponse<Response> = await PublicApi.get(
        `/snippet${pathname}`,
      );

      setSnippet(result.data.snippet);
    };

    load();
  }, []);

  const deleteSnippet = async () => {
    const result = await PublicApi.delete(`/snippet${pathname}`);
  };

  const handleUpdateSnippet = async (output: SnippetCreate) => {
    try {
      const result = await PublicApi.patch(`/snippet${pathname}`, output);
      setSnippet(result.data.snippet);
      setModalShow(false);
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="flex m-auto font-sans min-w-full">
      <main className="flex flex-col gap-20 w-[1440px]  m-auto">
        <div>
          <Link href="/">Previous page</Link>

          <div className="flex justify-between items-center py-5">
            <h2 className="text-5xl">{snippet?.title}</h2>
            <div className="flex gap-5">
              <div onClick={() => setModalShow(true)}>
                <Image src={Edit} alt="edit" width={32} height={32} />
              </div>
              <Modal open={modalShow} onClose={() => setModalShow(false)}>
                <SnippetForm
                  defaultValues={snippet as SnippetCreate}
                  onSubmit={handleUpdateSnippet}
                />
              </Modal>
              <div>
                <Image src={Delete} alt="delete" width={32} height={32} />
              </div>
            </div>
          </div>

          <hr />
          <div className="min-h-[400px] px-2 py-2 text-xl text-wrap break-all">
            <p>{snippet?.content}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
