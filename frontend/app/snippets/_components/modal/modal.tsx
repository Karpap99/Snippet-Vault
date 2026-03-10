"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black p-6 rounded">
        <div className="flex flex-col items-end ">
            <button onClick={onClose}>Close</button>
            <hr className="w-[100%]"></hr>
        </div>
        
        {children}
      </div>
    </div>,
    document.body
  );
}