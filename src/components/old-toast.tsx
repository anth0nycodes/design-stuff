import { type CSSProperties } from "react";

export function OldToast() {
  const cards = [
    {
      title: "Card 1",
      description: "This is the first card.",
    },
    {
      title: "Card 2",
      description: "This is the second card.",
    },
    {
      title: "Card 3",
      description: "This is the third card.",
    },
    {
      title: "Card 4",
      description: "This is the fourth card.",
    },
    {
      title: "Card 5",
      description: "This is the fifth card.",
    },
  ];

  return (
    <div className="group size-max font-sans place-items-center grid gap-2">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            p-4 w-90 h-20 border border-[#EEEEEE] ease-in-out duration-450 transition-transform rounded-xl bg-white shadow-md row-start-1 col-start-1
            scale-[calc(1-var(--index)*var(--scale-increment))] translate-y-[calc(var(--index)*var(--translate-increment))]
          `}
          style={{ "--index": cards.length - 1 - i } as CSSProperties}
        >
          <span className="font-bold">{card.title}</span>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
