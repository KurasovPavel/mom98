import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LayoutItem } from "./LayoutItem";
import { SectionFrame } from "./SectionFrame";
import { StarfieldOverlay } from "./StarfieldOverlay";
import { FallingLogos } from "./FallingLogos";
import { GullLogo } from "./GullLogo";
import { GlowBehind } from "./GlowBehind";
import { DexEmbed } from "./DexEmbed";
import type { SectionLayout } from "../config/layout";

const ChartPanel = ({ src }: { src: string }) => (
  <div className="h-full w-full rounded-[22px] border border-[#8562F0]/45 bg-[#8562F0]/20 p-3 shadow-[0_0_35px_rgba(133,98,240,0.35)]">
    <DexEmbed src={src} heightClassName="h-full min-h-[420px]" />
  </div>
);

type ChartSectionProps = {
  layout: SectionLayout;
  dexUrl: string;
};

export const ChartSection = ({ layout, dexUrl }: ChartSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="chart"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f2c] text-white"
      style={{ backgroundImage: "url(/chart-bg.png)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <StarfieldOverlay />
      <FallingLogos />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(133,98,240,0.28),_transparent_60%)]" />

      <SectionFrame layout={layout}>
        <LayoutItem item={layout.character} className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reduceMotion ? 0 : 1.2 }}
            className="relative"
          >
            <GlowBehind />
            <GullLogo className="relative h-full w-full object-contain opacity-80 drop-shadow-[0_0_50px_rgba(133,98,240,0.4)] md:opacity-100" alt="Gull mascot" />
          </motion.div>
        </LayoutItem>

        <LayoutItem item={layout.title} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
            className="text-3xl font-semibold tracking-[0.5em] text-white"
          >
            CHART
          </motion.h2>
        </LayoutItem>

        <LayoutItem item={layout.chartPanel}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.4 }}
            className="h-full w-full"
          >
            <ChartPanel src={dexUrl} />
          </motion.div>
        </LayoutItem>
      </SectionFrame>
    </section>
  );
};
