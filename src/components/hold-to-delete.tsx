"use client";

import { Trash2 } from "lucide-react";

export function HoldToDelete() {
  return (
    <button className="group relative flex h-10 cursor-pointer items-center gap-2 overflow-clip rounded-full bg-[#F6F5F5] px-6 font-medium text-[#21201C] transition-transform duration-160 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] active:scale-97">
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#FFDBDC] text-[#E5484D] transition-[clip-path] duration-200 ease-out [clip-path:inset(0_100%_0_0)] group-active:duration-1500 group-active:ease-linear group-active:[clip-path:inset(0_0_0_0)]">
        <Trash2 className="size-4" aria-hidden />
        Hold to delete
      </div>
      <Trash2 className="size-4" aria-hidden />
      Hold to delete
    </button>
  );
}
