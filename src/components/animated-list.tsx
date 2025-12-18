"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  icon: string;
  source: string;
  eventType: string;
  timeAgo: string;
  bgColor: string;
}

const items: Item[] = [
  {
    id: 0,
    icon: "💸",
    source: "Acme Studios",
    eventType: "Payment received",
    timeAgo: "2m ago",
    bgColor: "#60a5fa", // blue-400
  },
  {
    id: 1,
    icon: "💬",
    source: "Nimbus Chat",
    eventType: "New message",
    timeAgo: "5m ago",
    bgColor: "#4ade80", // green-400
  },
  {
    id: 2,
    icon: "🧑‍💻",
    source: "DevFlow",
    eventType: "User signed up",
    timeAgo: "8m ago",
    bgColor: "#facc15", // yellow-400
  },
  {
    id: 3,
    icon: "💸",
    source: "Stripe",
    eventType: "Payment received",
    timeAgo: "12m ago",
    bgColor: "#93c5fd", // blue-300
  },
  {
    id: 4,
    icon: "💬",
    source: "Support Inbox",
    eventType: "New message",
    timeAgo: "18m ago",
    bgColor: "#fb923c", // orange-400
  },
  {
    id: 5,
    icon: "🧑‍💻",
    source: "LaunchPad",
    eventType: "User signed up",
    timeAgo: "25m ago",
    bgColor: "#86efac", // green-300
  },
  {
    id: 6,
    icon: "💸",
    source: "Framer Store",
    eventType: "Payment received",
    timeAgo: "34m ago",
    bgColor: "#f87171", // red-400
  },
  {
    id: 7,
    icon: "💬",
    source: "Discord",
    eventType: "New message",
    timeAgo: "41m ago",
    bgColor: "#fde047", // yellow-300
  },
  {
    id: 8,
    icon: "🧑‍💻",
    source: "Beta Access",
    eventType: "User signed up",
    timeAgo: "1h ago",
    bgColor: "#bbf7d0", // green-200
  },
  {
    id: 9,
    icon: "💸",
    source: "Gumroad",
    eventType: "Payment received",
    timeAgo: "2h ago",
    bgColor: "#fecaca", // red-200
  },
];

const childVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export function AnimatedList() {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= items.length) return;

    const interval = setInterval(() => {
      const nextItem = items[index];
      setDisplayedItems((prev) => [nextItem, ...prev]);
      setIndex((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div className="relative mx-auto h-125 p-4 flex max-w-md flex-col gap-6 overflow-hidden">
      <AnimatePresence>
        {displayedItems.map((item) => (
          <motion.figure
            variants={childVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            layout
            key={item.id}
            className="rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: item.bgColor }}
                className="flex size-10 items-center justify-center rounded-2xl"
              >
                {item.icon}
              </div>

              <div className="flex flex-col font-medium">
                <figcaption className="flex items-center whitespace-pre text-lg">
                  <span>{item.eventType}</span>
                  <span className="mx-1">•</span>
                  <span className="text-xs text-background/70">
                    {item.timeAgo}
                  </span>
                </figcaption>
                <p className="text-sm">{item.source}</p>
              </div>
            </div>
          </motion.figure>
        ))}
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white to-transparent" />
    </motion.div>
  );
}
