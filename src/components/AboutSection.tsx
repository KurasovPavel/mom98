import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LayoutItem } from "./LayoutItem";
import { SectionFrame } from "./SectionFrame";
import { StarfieldOverlay } from "./StarfieldOverlay";
import { FallingLogos } from "./FallingLogos";
import { GullLogo } from "./GullLogo";
import { GlowBehind } from "./GlowBehind";
import type { SectionLayout } from "../config/layout";

const paragraphs = [
  "Monady is the first milady who settled on Monad as if the chain itself asked her to appear",
  "She is a figure instantly recognized by anyone who lives in memes and early-chain culture",
  "She’s here because it tracks: a fast chain deserves a girl with a personality",
];

type AboutSectionProps = {
  layout: SectionLayout;
};

export const AboutSection = ({ layout }: AboutSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f2c] text-white"
      style={{ backgroundImage: "url(/about-bg.png)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <StarfieldOverlay />
      <FallingLogos />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(133,98,240,0.28),_transparent_60%)]" />

      <SectionFrame layout={layout}>
        <LayoutItem item={layout.character} className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reduceMotion ? 0 : 1.4 }}
            className="relative"
          >
            <GlowBehind />
            <GullLogo className="relative h-full w-full object-contain opacity-80 drop-shadow-[0_0_50px_rgba(133,98,240,0.4)] md:opacity-100" alt="Gull mascot" />
          </motion.div>
        </LayoutItem>

        <LayoutItem item={layout.title} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.3 }}
            className="text-3xl font-semibold tracking-[0.5em] text-white"
          >
            ABOUT
          </motion.h2>
        </LayoutItem>

        <LayoutItem item={layout.textBlock}>
          <motion.div
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.15,
                  delayChildren: reduceMotion ? 0 : 0.6,
                },
              },
            }}
            className="space-y-5 text-center text-sm leading-relaxed text-white/80"
          >
            {paragraphs.map((text) => (
              <motion.p
                key={text}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </LayoutItem>

        <LayoutItem item={layout.aboutLabel} className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.9 }}
            className="text-sm font-semibold tracking-[0.5em] text-white/80"
          >
            ABOUT ME
          </motion.div>
        </LayoutItem>

        <LayoutItem item={layout.aboutLine} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 1.05 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white/80"
          >
            <span>I AM COOL AND I LIKE</span>
            <img src="/monad.png" alt="Monad" className="h-4 w-4" />
          </motion.div>
        </LayoutItem>
      </SectionFrame>
    </section>
  );
};
