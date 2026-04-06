import { useEffect } from "react";
import { useCropStore } from "../stores/crop-store";

export function useGrowthLoop() {
  const updateGrowth = useCropStore((state) => state.updateGrowth);

  useEffect(() => {
    const interval = setInterval(() => updateGrowth(), 1000);
    return () => clearInterval(interval);
  }, [updateGrowth]);
}
