"use client";

import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Code } from "lucide-react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HorizontalComparisonSlider() {
  const [isDragging, setIsDragging] = useState(false);
  const [percentage, setPercentage] = useState(50);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const updateSliderPosition = (x: number) => {
    const parent = parentRef.current;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const offsetX = x - parentRect.left;
    setPercentage(clamp((offsetX / parentRect.width) * 100, 0, 100));
  };

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => updateSliderPosition(e.clientX);
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={parentRef}
      className="relative h-100 w-175 overflow-clip rounded-xl"
    >
      <Image
        src="https://animations.dev/_next/image?url=%2Fcss-animations%2Fblue_distortion_2.png&w=2048&q=75"
        className="pointer-events-none absolute inset-0 z-10 size-full object-cover select-none"
        style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
        width={700}
        height={400}
        alt="Before"
      />
      <div
        onMouseDown={handleMouseDown}
        className="absolute inset-y-0 z-20 flex h-full -translate-x-1/2 cursor-ew-resize items-center justify-center"
        aria-label="Comparison slider"
        role="slider"
        aria-valuenow={percentage}
        style={{ left: `${percentage}%` }}
      >
        <div className="h-full w-1.5 bg-white/40 transition-colors" />
        <div className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2">
          <Code className="aria-hidden size-4 stroke-3" />
        </div>
      </div>
      <Image
        src="https://animations.dev/_next/image?url=%2Fcss-animations%2Fred_distortion_2.png&w=2048&q=75"
        className="pointer-events-none absolute inset-0 size-full object-cover select-none"
        width={700}
        height={400}
        alt="After"
      />
    </div>
  );
}
