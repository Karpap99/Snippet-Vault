"use client";

import { useEffect, useState } from "react";
import { SnippetCreate, SnippetGet, ResponseSignle } from "../types";
import { PublicApi } from "../_hooks/api";
import { AxiosResponse } from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Delete from "@/assets/images/delete.svg";
import Edit from "@/assets/images/edit.svg";
import { Modal } from "../_components/modal/modal";
import { SnippetForm } from "../_components/snippetForm/snippetForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const [snippet, setSnippet] = useState<SnippetGet>();
  const pathname = usePathname();
  const router = useRouter();

  const [modalShow, setModalShow] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const result: AxiosResponse<ResponseSignle> = await PublicApi.get(
        `/snippet${pathname}`,
      );

      setSnippet(result.data.snippet);
    };

    load();
  }, []);

  const handleDeleteSnippet = async () => {
    try {
      await PublicApi.delete(`/snippet/${snippet?._id}`);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSnippet = async (output: SnippetCreate) => {
    try {
      const result = await PublicApi.patch(`/snippet/${snippet?._id}`, output);
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

          <div className="flex justify-between items-center py-5 gap-5">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-5xl">{snippet?.title}</h2>
              <div>
                <h3>
                  createdAt: {new Date(snippet?.createdAt ?? 0).toUTCString()}
                </h3>
                <h3>
                  updatedAt: {new Date(snippet?.updatedAt ?? 0).toUTCString()}
                </h3>
              </div>
            </div>

            <div className="flex gap-5">
              <div
                onClick={() => setModalShow(true)}
                className="cursor-pointer"
              >
                <Image src={Edit} alt="edit" width={32} height={32} />
              </div>
              <Modal open={modalShow} onClose={() => setModalShow(false)}>
                <SnippetForm
                  defaultValues={snippet as SnippetCreate}
                  onSubmit={handleUpdateSnippet}
                />
              </Modal>
              <div onClick={handleDeleteSnippet} className="cursor-pointer">
                <Image src={Delete} alt="delete" width={32} height={32} />
              </div>
            </div>
          </div>

          <hr />
          <div className="min-h-[400px] px-2 py-2 text-xl text-wrap break-all">
            <p>{snippet?.content}</p>
          </div>
          <hr />
          <div className="m-2 flex justify-between">
            <div className="flex flex-wrap gap-5 max-w-400 overflow-hidden items-center ">
              {snippet?.tags.map((value) => (
                <p
                  className="bg-gray-300 rounded-[10px] py-[2px] px-2 text-[18px]"
                  key={value}
                >
                  {value}
                </p>
              ))}
            </div>
            <p className="text-[36px]">{snippet?.type}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
