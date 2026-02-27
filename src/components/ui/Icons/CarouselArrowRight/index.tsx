import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

/**
 * アイコンのスタイル定義
 * 滲みを防ぐために、画像自体のレンダリング設定(crispEdges)を隠し味として追加する場合があります
 */
const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300 hover:opacity-hover",
  variants: {
    color: {
      white: "text-white hover:text-dark-gray",
      black: "text-black",
    },
    size: {
      responsive:
        "w-[calc(30/16*1rem)] h-[calc(30/16*1rem)] tablet:w-[calc(40/16*1rem)] tablet:h-[calc(40/16*1rem)]",
    },
    left: {
      true: "-scale-x-100",
      false: "",
    },
  },
  defaultVariants: {
    color: "white",
    size: "responsive",
    left: false,
  },
});

export type CarouselArrowRightProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof iconStyles>;

export const CarouselArrowRight = ({
  color,
  size,
  left,
  className,
  ...props
}: CarouselArrowRightProps) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // shapeRendering を追加して描画の精度を調整します
      style={{ shapeRendering: "geometricPrecision" }}
      className={iconStyles({ color, size, left, className })}
      {...props}
    >
      {/* 背景の円：
        座標を整数(0, 0)にし、サイズを40x40に固定。
        rxも20の整数にすることで、ピクセルグリッドに最適化します。
      */}
      <rect
        width="40"
        height="40"
        rx="20"
        fill="#0A0A0A" // デザイントークンがあればそれに合わせますが、ここではblackに固定
        fillOpacity="0.8"
      />

      {/* 外枠(stroke)：
        0.5のズレをなくし、x="1", y="1", width="38" に変更。
        これにより、1pxの線がviewBoxの内側（ピクセルに重なる位置）に綺麗に収まります。
      */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="19"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1"
      />

      {/* 矢印部分：
        パスのデータが細かい数値の場合は、shape-rendering の恩恵を受けやすくなります。
      */}
      <path
        d="M17 26.12L23.1808 20L17 13.88L18.9028 12L27 20L18.9028 28L17 26.12Z"
        fill="currentColor"
      />
    </svg>
  );
};
