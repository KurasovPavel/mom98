import type { MouseEventHandler } from "react";

const items = [
  { label: "ABOUT", id: "about" },
  { label: "TWITTER", id: "twitter" },
  { label: "CHART", id: "chart" },
  { label: "BUY", id: "buy" },
];

type NavMenuProps = {
  activeId: string;
  onNavigate: (id: string) => void;
};

export const NavMenu = ({ activeId, onNavigate }: NavMenuProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetId = event.currentTarget.dataset.targetId;
    if (targetId) {
      onNavigate(targetId);
    }
  };

  return (
    <nav aria-label="Primary" className="flex w-full items-center justify-start gap-4 text-xs font-semibold tracking-[0.2em] text-white/90 md:gap-6 md:text-sm">
      {items.map((item) => (
        <button
          key={item.id}
          data-target-id={item.id}
          onClick={handleClick}
          className={`group relative transition-all duration-300 hover:-translate-y-0.5 hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#8562F0]/80 after:opacity-0 after:transition-opacity after:content-[''] ${
            activeId === item.id ? "text-white after:opacity-100" : ""
          }`}
        >
          <span className="relative z-10">{item.label}</span>
          <span className="absolute -inset-2 -z-10 rounded-full bg-[#8562F0]/25 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      ))}
    </nav>
  );
};
