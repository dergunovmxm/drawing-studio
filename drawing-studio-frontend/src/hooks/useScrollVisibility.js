import { useState, useEffect } from "react";

export const useScrollVisibility = (threshold = 200) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY <= threshold);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
};
