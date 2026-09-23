"use client";

import { PointerEvent, useState } from "react";
import Image from "next/image";
import { clamp } from "@/lib/helpers";

const MAX_X_TILT = 12;
const MAX_Y_TILT = 8;
const MAX_SHADOW_OFFSET = 12;
const PRESS_DEPTH = 1;
// fractal noise stretched horizontally (low x frequency, high y) reads as brushed metal grain
const BRUSHED_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
// a faint diagonal falloff so the plate isn't a flat fill
const METAL_BASE = `linear-gradient(135deg, #fcfcfd 0%, #eff1f3 45%, #f6f7f8 70%, #eceef1 100%)`;
// alternating light and dark cool grays read as polished steel; the white gaps are the highlights
const FOIL_GRADIENT = `linear-gradient(115deg,
  transparent 20%,
  hsl(215 10% 82%) 30%,
  hsl(215 15% 97%) 37%,
  hsl(215 8% 72%) 45%,
  hsl(0 0% 100%) 52%,
  hsl(215 12% 80%) 60%,
  hsl(215 15% 94%) 68%,
  transparent 80%)`;

export function DepthCard() {
  // pointer position normalized to -1..1, center is 0
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  // horizontal movement tilts around the Y axis, vertical around the X axis
  const rotateX = -pointer.y * MAX_Y_TILT;
  const rotateY = pointer.x * MAX_X_TILT;

  // pressing sinks the card further toward the pointer. it lives on the separate
  // `rotate` property (same axis as the tilt) so it can share the scale's duration
  const tilt = Math.hypot(rotateX, rotateY);
  const pressRotate =
    tilt === 0
      ? "none"
      : `${rotateX} ${rotateY} 0 ${isPressing ? tilt * PRESS_DEPTH : 0}deg`;

  const tiltDuration = isHovering ? 250 : 400;
  // sink in quickly, recover slowly so the release doesn't snap back
  const pressDuration = isPressing ? 400 : 1000;

  // pointer as 0..100% across the card, where the foil catches the light
  const glareX = (pointer.x + 1) * 50;
  const glareY = (pointer.y + 1) * 50;

  // shadow falls away from the pointer and tightens as the card is pressed down
  const lift = isPressing ? 0.4 : 1;
  const sx = -pointer.x * MAX_SHADOW_OFFSET * lift;
  const sy = (MAX_SHADOW_OFFSET * 0.5 - pointer.y * MAX_SHADOW_OFFSET) * lift;
  const boxShadow = [
    // bevel: bright top edge and a darker bottom edge give the plate some thickness
    "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    "inset 0 -1px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 2px rgba(0, 0, 0, 0.06)",
    `${sx * 0.5}px ${sy * 0.5 + 2}px ${8 * lift}px rgba(0, 0, 0, 0.06)`,
    `${sx}px ${sy + 8}px ${32 * lift}px rgba(0, 0, 0, 0.1)`,
  ].join(", ");

  const resetPointer = () => {
    setIsHovering(false);
    setPointer({ x: 0, y: 0 });
  };

  const handleRelease = (e: PointerEvent<HTMLButtonElement>) => {
    setIsPressing(false);

    // the button covers the unrotated wrapper, so its rect tells us if the release happened outside
    const { left, right, top, bottom } =
      e.currentTarget.getBoundingClientRect();
    const isOutside =
      e.clientX < left ||
      e.clientX > right ||
      e.clientY < top ||
      e.clientY > bottom;

    // touch has no hover to fall back to, so always settle the card
    if (isOutside || e.pointerType !== "mouse") resetPointer();
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    // measure the unrotated wrapper; the rotated card's rect changes as it tilts
    const cardRect = e.currentTarget.getBoundingClientRect();
    const cardX = clamp(clientX - cardRect.left, 0, cardRect.width);
    const cardY = clamp(clientY - cardRect.top, 0, cardRect.height);

    // normalize to -1..1 with the center as 0
    const nx = (cardX / cardRect.width) * 2 - 1;
    const ny = (cardY / cardRect.height) * 2 - 1;

    setPointer({ x: nx, y: ny });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => {
        // while pressed, hold the tilt and scale until release
        if (!isPressing) resetPointer();
      }}
      className="group relative aspect-1.75/1 w-105 perspective-distant"
    >
      <div
        data-pressed={isPressing}
        className="pointer-events-none absolute inset-0 overflow-clip rounded-xl outline-1 outline-[#EBEBEB] transform-3d data-[pressed=true]:scale-97"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          rotate: pressRotate,
          backgroundImage: `${BRUSHED_GRAIN}, ${METAL_BASE}`,
          boxShadow,
          // tilt follows the pointer quickly while hovering; press and release share one duration
          transition: `transform ${tiltDuration}ms ease, rotate ${pressDuration}ms ease, scale ${pressDuration}ms ease, box-shadow ${pressDuration}ms ease`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply"
          style={{
            backgroundImage: FOIL_GRADIENT,
            backgroundSize: "300% 300%",
            // the sheen band sweeps across as the pointer moves, like light catching foil
            backgroundPosition: `${glareX}% ${glareY}%`,
            // only show the sheen around where the light hits
            maskImage: `radial-gradient(circle at ${glareX}% ${glareY}%, black, transparent 70%)`,
            opacity: isHovering ? 0.35 : 0,
            transition: "background-position 700ms ease, opacity 1s ease",
          }}
        />
        <div className="flex h-full flex-col justify-between p-6">
          <div className="flex items-center justify-between select-none">
            <div className="flex flex-col items-start text-2xl">
              <span className="leading-tight">anthony hoang</span>
              <span className="leading-tight text-[#6B6B6B]">
                design engineer
              </span>
            </div>
            <div className="size-15 overflow-clip rounded-full ring-1 ring-[#EBEBEB]">
              <Image
                src="/mepfp.png"
                width={250}
                height={250}
                alt="Me"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm select-none">
            <span className="leading-none text-[#9B9B9B]">united states</span>
            <span className="leading-none text-[#6B6B6B]">
              anthonyhoang.dev
            </span>
          </div>
        </div>
      </div>
      <button
        onPointerDown={(e) => {
          // keep receiving move/up events even after the pointer leaves the card
          e.currentTarget.setPointerCapture(e.pointerId);
          setIsPressing(true);
        }}
        onPointerUp={handleRelease}
        onPointerCancel={handleRelease}
        className="absolute inset-0 z-10 cursor-pointer"
      />
    </div>
  );
}
