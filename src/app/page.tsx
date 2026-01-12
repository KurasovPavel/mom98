import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ChartSection } from "../components/ChartSection";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { links } from "../config/links";

const sectionIds = ["hero", "about", "chart"] as const;

type SectionId = (typeof sectionIds)[number];

const getSectionElements = () =>
  sectionIds
    .map((id) => document.getElementById(id))
    .filter((element): element is HTMLElement => Boolean(element));

export default function Page() {
  const layout = useResponsiveLayout();
  const [activeId, setActiveId] = useState<SectionId>("hero");

  useEffect(() => {
    const elements = getSectionElements();
    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const navigate = (id: string) => {
    if (id === "twitter") {
      if (links.twitter) {
        window.open(links.twitter, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (id === "buy") {
      if (links.buy) {
        window.open(links.buy, "_blank", "noopener,noreferrer");
      }
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const memoizedLayout = useMemo(() => layout, [layout]);

  return (
    <div className="text-white">
      <HeroSection
        layout={memoizedLayout.hero}
        activeId={activeId}
        onNavigate={navigate}
        contract={links.contract}
      />
      <AboutSection layout={memoizedLayout.about} />
      <ChartSection layout={memoizedLayout.chart} dexUrl={links.dexEmbed} />
      <Toaster position="bottom-center" />
    </div>
  );
}
