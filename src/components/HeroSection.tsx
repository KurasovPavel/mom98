import { LayoutItem } from "./LayoutItem";
import { SectionFrame } from "./SectionFrame";
import { NavMenu } from "./NavMenu";
import { GullLogo } from "./GullLogo";
import { ContractAddress } from "./ContractAddress";
import { StarfieldOverlay } from "./StarfieldOverlay";
import type { SectionLayout } from "../config/layout";
import { useState } from "react";

const ArrowHint = ({ onClick }: { onClick: () => void }) => {
  const [hidden, setHidden] = useState(false);
  if (hidden) {
    return null;
  }

  return (
    <button type="button" onClick={onClick} className="motion-safe:animate-bounce">
      <img
        src="/arrow-down.png"
        alt="Scroll down"
        className="h-full w-full object-contain"
        onError={() => setHidden(true)}
      />
    </button>
  );
};

type HeroSectionProps = {
  layout: SectionLayout;
  activeId: string;
  onNavigate: (id: string) => void;
  contract: string;
};

export const HeroSection = ({ layout, activeId, onNavigate, contract }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f2c] text-white"
      style={{ backgroundImage: "url(/hero-bg.png)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <StarfieldOverlay />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(133,98,240,0.25),_transparent_60%)]" />

      <SectionFrame layout={layout}>
        <LayoutItem item={layout.nav}>
          <NavMenu activeId={activeId} onNavigate={onNavigate} />
        </LayoutItem>
        <LayoutItem item={layout.logo} className="flex items-center justify-center">
          <GullLogo className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(133,98,240,0.45)]" alt="Gull mascot" />
        </LayoutItem>
        <LayoutItem item={layout.contract}>
          <ContractAddress address={contract} />
        </LayoutItem>
        <LayoutItem item={layout.arrow}>
          <ArrowHint onClick={() => onNavigate("about")} />
        </LayoutItem>
      </SectionFrame>
    </section>
  );
};
