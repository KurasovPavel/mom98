import type { CSSProperties, ReactNode } from "react";
import type { LayoutItem as LayoutItemType } from "../config/layout";

const alignTransforms: Record<NonNullable<LayoutItemType["align"]>, string> = {
  center: "translate(-50%, -50%)",
  top: "translate(-50%, 0)",
  bottom: "translate(-50%, -100%)",
  left: "translate(0, -50%)",
  right: "translate(-100%, -50%)",
  "top-left": "translate(0, 0)",
  "top-right": "translate(-100%, 0)",
  "bottom-left": "translate(0, -100%)",
  "bottom-right": "translate(-100%, -100%)",
};

const buildTransform = (align?: LayoutItemType["align"], scale?: number) => {
  const base = align ? alignTransforms[align] : "translate(0, 0)";
  if (!scale || scale === 1) {
    return base;
  }
  return `${base} scale(${scale})`;
};

export const getLayoutStyle = (item?: LayoutItemType): CSSProperties => {
  if (!item) {
    return {};
  }

  return {
    position: "absolute",
    left: `${item.x}%`,
    top: `${item.y}%`,
    width: item.width,
    height: item.height,
    zIndex: item.zIndex,
    transform: buildTransform(item.align, item.scale),
  };
};

type LayoutItemProps = {
  item?: LayoutItemType;
  className?: string;
  children: ReactNode;
};

export const LayoutItem = ({ item, className, children }: LayoutItemProps) => {
  const style = getLayoutStyle(item);
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
