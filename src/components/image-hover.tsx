"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, MouseEvent, useEffect } from "react";

export function ImageHover() {
  interface Item {
    title: string;
    src: string;
  }

  const items: Item[] = [
    {
      title: "yes",
      src: "https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg",
    },
  ];

  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [displayedItem, setDisplayedItem] = useState<Item | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const config = { stiffness: 100, damping: 20, mass: 0.5 };

  const cursorXSpring = useSpring(x, config);
  const cursorYSpring = useSpring(y, config);

  function handleMouseMove(e: MouseEvent) {
    const { clientX, clientY } = e;
    x.set(clientX);
    y.set(clientY);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedItem(hoveredItem);
    }, 200);

    return () => clearTimeout(timeout);
  }, [hoveredItem]);

  return (
    <section onMouseMove={handleMouseMove}>
      {items.map((item) => (
        <div
          key={item.src}
          className="p-16 bg-amber-400"
          onMouseEnter={() => setHoveredItem(item)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          hover me!
        </div>
      ))}
      <motion.div
        className="fixed pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <AnimatePresence>
          {displayedItem?.src && (
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                ease: "easeIn",
                duration: 0.2,
              }}
            >
              <img
                src={displayedItem.src}
                alt={displayedItem.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
