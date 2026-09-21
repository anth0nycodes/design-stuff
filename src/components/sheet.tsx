"use client";

import { useState } from "react";
import { Headphones, Home, Info, SquareText, X } from "lucide-react";

export function Sheet() {
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "About",
      icon: Info,
      href: "/",
    },
    {
      label: "Contact",
      icon: Headphones,
      href: "/",
    },
    {
      label: "Blog",
      icon: SquareText,
      href: "/",
    },
  ];

  return (
    <>
      <button
        className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)]"
        onClick={() => setOpen(true)}
      >
        Open menu
      </button>
      <div
        data-open={open}
        className="group pointer-events-none fixed inset-0 flex justify-end data-[open=true]:pointer-events-auto"
      >
        {/* Dark Overlay */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity group-data-[open=true]:opacity-100"
        />

        {/* Sheet */}
        <div className="z-100 h-full w-75 translate-x-full bg-white p-4 transition-transform duration-375 group-data-[open=false]:duration-300 group-data-[open=false]:ease-[cubic-bezier(0.45,0.75,0.43,1)] group-data-[open=true]:translate-x-0">
          <div className="flex items-center justify-between p-4">
            <span className="text-2xl font-bold">Links</span>
            <button
              className="cursor-pointer rounded-md p-1 hover:bg-gray-100"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          {items.map((item) => (
            <a
              key={item.label}
              onClick={() => setOpen(false)}
              className="flex cursor-pointer items-center gap-2 rounded-lg p-4 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              <item.icon className="size-5" aria-hidden />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
