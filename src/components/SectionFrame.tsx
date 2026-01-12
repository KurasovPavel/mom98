import type { ReactNode } from "react";
import { LayoutItem } from "./LayoutItem";
import type { SectionLayout } from "../config/layout";

const frameClassName =
  "relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(8,14,40,0.45)]";

const innerGlowClassName =
  "pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_60px_rgba(9,15,50,0.45)]";

const vignetteClassName =
  "pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.35),_transparent_70%)]";

const hazeClassName =
  "pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(circle_at_bottom,_rgba(133,98,240,0.35),_transparent_70%)]";

type SectionFrameProps = {
  layout: SectionLayout;
  children: ReactNode;
};

export const SectionFrame = ({ layout, children }: SectionFrameProps) => {
  return (
    <LayoutItem item={layout.frame} className={frameClassName}>
      <div className="absolute inset-0">
        <div className={innerGlowClassName} />
        <div className={vignetteClassName} />
        <div className={hazeClassName} />
      </div>
      <div className="relative h-full w-full">{children}</div>
    </LayoutItem>
  );
};
