"use client";

import { CSSProperties, useState } from "react";

export function AddToast() {
  const [toasts, setToasts] = useState(0);

  return (
    <div className="relative flex flex-col items-end p-6 h-full">
      <div className="absolute left-1/2 bottom-20 flex flex-col gap-4 w-89 -translate-x-1/2">
        {Array.from({ length: toasts }).map((_, i) => (
          <Toast key={i} index={toasts - i - 1} />
        ))}
      </div>
      <button
        className="relative mt-auto px-3 w-max h-8 text-sm font-medium bg-white rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)]"
        onClick={() => {
          setToasts(toasts + 1);
        }}
      >
        Add toast
      </button>
    </div>
  );
}

interface ToastProps {
  index: number;
}

function Toast({ index }: ToastProps) {
  return (
    <div
      className="absolute bottom-0 flex flex-col gap-1 p-[10px_14px_13px] w-full text-[13px] bg-white rounded-lg starting:opacity-0 starting:translate-y-full transition-[opacity,translate] duration-400 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)] opacity-100 translate-y-[calc(var(--index)*(100%+8px)*-1)]"
      style={{ "--index": index } as CSSProperties}
    >
      <span className="font-medium text-[#1B1B1D]">Event Created </span>
      <span className="leading-none font-normal text-[#717175]">
        Monday, January 3rd at 6:00pm
      </span>
    </div>
  );
}
