"use client";

import { useEffect, useRef, useState } from "react";
import {
  Blocks,
  BookOpen,
  Briefcase,
  CircleDollarSign,
  Home,
  Info,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";

const NAVLINKS = [
  {
    label: "Home",
    icon: Home,
  },
  {
    label: "About",
    icon: Info,
  },
  {
    label: "Pricing",
    icon: CircleDollarSign,
  },
  {
    label: "Contact",
    icon: Mail,
  },
  {
    label: "Docs",
    icon: BookOpen,
  },
  {
    label: "Blog",
    icon: Newspaper,
  },
  {
    label: "Integrations",
    icon: Blocks,
  },
  {
    label: "Team",
    icon: Users,
  },
  {
    label: "Careers",
    icon: Briefcase,
  },
];

export function Navlinks() {
  const [activeTab, setActiveTab] = useState("Home");
  const [atEnd, setAtEnd] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const clipContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTabElementRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scroller;
      setAtEnd(scrollLeft >= scrollWidth - clientWidth - 1);
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const clipContainer = clipContainerRef.current;
    const activeTabElement = activeTabElementRef.current;
    if (!clipContainer || !activeTabElement) return;
    const { offsetLeft, offsetWidth } = activeTabElement;
    const clipRight = clipContainer.offsetWidth - (offsetLeft + offsetWidth);
    clipContainer.style.clipPath = `inset(0 ${clipRight}px 0 ${offsetLeft}px round 17px)`;
  }, [activeTab]);

  return (
    <div
      className="-ml-6 mask-[linear-gradient(to_right,transparent_0%,white_var(--fade-size),white_calc(100%-var(--fade-right)),transparent_100%)] text-sm font-medium [--fade-size:24px]"
      style={{ "--fade-right": atEnd ? "0px" : "24px" } as React.CSSProperties}
    >
      <div
        ref={scrollerRef}
        className="max-w-130 scrollbar-none overflow-x-scroll pl-6 [&::-webkit-scrollbar]:hidden"
      >
        <div className="relative flex w-max text-sm font-medium">
          <ul className="flex items-center gap-2">
            {NAVLINKS.map((link) => (
              <li key={link.label}>
                <button
                  ref={activeTab === link.label ? activeTabElementRef : null}
                  tabIndex={activeTab === link.label ? 0 : -1}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setActiveTab(link.label)}
                  className="flex cursor-pointer items-center gap-2 px-4 py-1.75 whitespace-nowrap"
                >
                  <link.icon className="h-4 w-4" aria-hidden />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div
            ref={clipContainerRef}
            className="absolute bg-black text-white transition-[clip-path] duration-250 ease-[ease]"
            style={{
              clipPath: `inset(0px 90.27% 0px 0% round 17px)`,
            }}
            aria-hidden
          >
            <ul className="flex items-center gap-2">
              {NAVLINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setActiveTab(link.label)}
                    className="flex cursor-pointer items-center gap-2 px-4 py-1.75 whitespace-nowrap"
                    tabIndex={-1}
                  >
                    <link.icon className="h-4 w-4" aria-hidden />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
