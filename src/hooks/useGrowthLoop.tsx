import { useEffect, useRef } from "react";
import { useCropStore } from "../stores/crop-store";
import { p } from "motion/react-client";

export function useGrowthLoop() {
  const updateGrowth = useCropStore((state) => state.updateGrowth);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    const productionInterval = setInterval(() => {
      updateGrowth();
    }, 1000);

    const animateGrowth = (timestamp: number) => {
      if (lastUpdateRef.current) {
        const delta = timestamp - lastUpdateRef.current;

        if (delta >= 16) {
          // Update visual-only state here.
        }
      }

      lastUpdateRef.current = timestamp;

      animationFrameRef.current = requestAnimationFrame(animateGrowth);
    };

    animationFrameRef.current = requestAnimationFrame(animateGrowth);

    return () => {
      clearInterval(productionInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateGrowth]);
}
