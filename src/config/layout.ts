export type LayoutAlign =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type LayoutItem = {
  x: number;
  y: number;
  width?: string;
  height?: string;
  scale?: number;
  zIndex?: number;
  align?: LayoutAlign;
};

export type SectionLayout = {
  frame: LayoutItem;
  nav?: LayoutItem;
  logo?: LayoutItem;
  contract?: LayoutItem;
  arrow?: LayoutItem;
  character?: LayoutItem;
  title?: LayoutItem;
  textBlock?: LayoutItem;
  aboutLabel?: LayoutItem;
  aboutLine?: LayoutItem;
  chartPanel?: LayoutItem;
};

export type LayoutConfig = {
  hero: SectionLayout;
  about: SectionLayout;
  chart: SectionLayout;
};

export const layout: { desktop: LayoutConfig; mobile: LayoutConfig } = {
  desktop: {
    hero: {
      frame: {
        x: 50,
        y: 50,
        width: "88%",
        height: "82%",
        align: "center",
        zIndex: 2,
      },
      nav: {
        x: 8,
        y: 10,
        width: "360px",
        align: "top-left",
        zIndex: 3,
      },
      logo: {
        x: 50,
        y: 50,
        width: "320px",
        height: "320px",
        align: "center",
        zIndex: 3,
      },
      contract: {
        x: 50,
        y: 78,
        width: "70%",
        align: "center",
        zIndex: 3,
      },
      arrow: {
        x: 50,
        y: 92,
        width: "36px",
        height: "36px",
        align: "center",
        zIndex: 3,
      },
    },
    about: {
      frame: {
        x: 50,
        y: 50,
        width: "88%",
        height: "82%",
        align: "center",
        zIndex: 2,
      },
      character: {
        x: 24,
        y: 56,
        width: "360px",
        height: "360px",
        align: "center",
        zIndex: 3,
      },
      title: {
        x: 70,
        y: 24,
        width: "320px",
        align: "center",
        zIndex: 3,
      },
      textBlock: {
        x: 70,
        y: 50,
        width: "48%",
        align: "center",
        zIndex: 3,
      },
      aboutLabel: {
        x: 70,
        y: 72,
        width: "200px",
        align: "center",
        zIndex: 3,
      },
      aboutLine: {
        x: 70,
        y: 82,
        width: "48%",
        align: "center",
        zIndex: 3,
      },
    },
    chart: {
      frame: {
        x: 50,
        y: 50,
        width: "88%",
        height: "82%",
        align: "center",
        zIndex: 2,
      },
      character: {
        x: 24,
        y: 56,
        width: "360px",
        height: "360px",
        align: "center",
        zIndex: 3,
      },
      title: {
        x: 70,
        y: 22,
        width: "260px",
        align: "center",
        zIndex: 3,
      },
      chartPanel: {
        x: 70,
        y: 60,
        width: "48%",
        height: "58%",
        align: "center",
        zIndex: 3,
      },
    },
  },
  mobile: {
    hero: {
      frame: {
        x: 50,
        y: 50,
        width: "92%",
        height: "84%",
        align: "center",
        zIndex: 2,
      },
      nav: {
        x: 50,
        y: 10,
        width: "90%",
        align: "center",
        zIndex: 3,
      },
      logo: {
        x: 50,
        y: 45,
        width: "220px",
        height: "220px",
        align: "center",
        zIndex: 3,
      },
      contract: {
        x: 50,
        y: 72,
        width: "92%",
        align: "center",
        zIndex: 3,
      },
      arrow: {
        x: 50,
        y: 90,
        width: "32px",
        height: "32px",
        align: "center",
        zIndex: 3,
      },
    },
    about: {
      frame: {
        x: 50,
        y: 50,
        width: "92%",
        height: "84%",
        align: "center",
        zIndex: 2,
      },
      character: {
        x: 50,
        y: 32,
        width: "260px",
        height: "260px",
        align: "center",
        zIndex: 3,
      },
      title: {
        x: 50,
        y: 50,
        width: "240px",
        align: "center",
        zIndex: 3,
      },
      textBlock: {
        x: 50,
        y: 66,
        width: "85%",
        align: "center",
        zIndex: 3,
      },
      aboutLabel: {
        x: 50,
        y: 78,
        width: "200px",
        align: "center",
        zIndex: 3,
      },
      aboutLine: {
        x: 50,
        y: 86,
        width: "85%",
        align: "center",
        zIndex: 3,
      },
    },
    chart: {
      frame: {
        x: 50,
        y: 50,
        width: "92%",
        height: "84%",
        align: "center",
        zIndex: 2,
      },
      character: {
        x: 50,
        y: 28,
        width: "240px",
        height: "240px",
        align: "center",
        zIndex: 3,
      },
      title: {
        x: 50,
        y: 46,
        width: "200px",
        align: "center",
        zIndex: 3,
      },
      chartPanel: {
        x: 50,
        y: 72,
        width: "92%",
        height: "50%",
        align: "center",
        zIndex: 3,
      },
    },
  },
};
