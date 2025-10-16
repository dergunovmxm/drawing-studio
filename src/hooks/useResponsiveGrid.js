import { useState, useEffect, useMemo } from "react";

const BREAKPOINTS = [
  { max: 480, cols: 2 },
  { max: 768, cols: 2 },
  { max: 1024, cols: 3 },
  { max: Infinity, cols: 4 },
];

function getCols(width) {
  return BREAKPOINTS.find((b) => width <= b.max).cols;
}

export default function useResponsiveGallery(
  images = [],
  total = 12,
  initialWidth = typeof window !== "undefined" ? window.innerWidth : 1200
) {
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cols = useMemo(() => getCols(width), [width]);

  const srcList = useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images.slice(0, total);
  }, [images, total]);

  const placeholders = Math.max(0, total - srcList.length);
  const filled = useMemo(
    () => [...srcList, ...Array.from({ length: placeholders })],
    [srcList, placeholders]
  );

  return {
    cols,
    width,
    filled,
    total,
    placeholders,
  };
}
