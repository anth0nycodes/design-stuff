"use client";

import { useEffect, useRef, useState } from "react";
import { CircleDollarSign, Home, Info, Mail } from "lucide-react";

export function Navlinks() {
  const [activeTab, setActiveTab] = useState("Home");
  const clipContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTabElementRef = useRef<HTMLButtonElement | null>(null);

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
  ];

  useEffect(() => {
    const clipContainer = clipContainerRef.current;
    const activeTabElement = activeTabElementRef.current;
    if (!clipContainer || !activeTabElement) return;
    const clipContainerRect = clipContainer.getBoundingClientRect();
    const { offsetLeft, offsetWidth } = activeTabElement;
    console.log("offsetLeft:", offsetLeft);
    const clipLeftPercentage = (offsetLeft / clipContainerRect.width) * 100;
    const clipRightPercentage =
      100 - ((offsetLeft + offsetWidth) / clipContainerRect.width) * 100;
    clipContainer.style.clipPath = `inset(0 ${clipRightPercentage.toFixed()}% 0 ${clipLeftPercentage.toFixed()}% round 17px)`;
  }, [activeTab]);

  return (
    <div className="relative flex text-sm font-medium">
      <ul className="flex items-center gap-2">
        {NAVLINKS.map((link) => (
          <li key={link.label}>
            <button
              ref={activeTab === link.label ? activeTabElementRef : null}
              onClick={() => setActiveTab(link.label)}
              className="flex cursor-pointer items-center gap-2 px-4 py-1.75"
            >
              <link.icon className="h-4 w-4" aria-hidden />
              {link.label}
            </button>
          </li>
        ))}
      </ul>
      <div
        ref={clipContainerRef}
        className="absolute bg-[#2090ff] text-white transition-[clip-path] duration-250 ease-[ease]"
        style={{
          clipPath: `inset(0px 78% 0px 0% round 17px)`,
        }}
        aria-hidden
      >
        <ul className="flex items-center gap-2">
          {NAVLINKS.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => setActiveTab(link.label)}
                className="flex cursor-pointer items-center gap-2 px-4 py-1.75"
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
  );
}
