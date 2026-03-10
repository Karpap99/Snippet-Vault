"use client"

import { useState } from "react";
import { CreateSnippet } from "./_components/createSnippet/createSnippet";
import { Modal } from "./_components/modal/modal";

export default function Snippets() {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false)

  return (
    <div className="">
      <main className="">
       <div>
        <div>
          <button onClick={() => setFormIsOpen(true)}>
              Add snippet
          </button>
          <Modal open={formIsOpen} onClose={() => setFormIsOpen(false)}>
            <CreateSnippet/>
          </Modal>
        </div>
        <div>

        </div>
       </div>
      </main>
    </div>
  );
}
