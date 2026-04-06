import { useState, useEffect, useMemo } from "react";
import { cn } from "../../utils/cn";

interface ProgressBarProps {
  timestamps: number[];
  maxTime: number; // in seconds
  direction?: "RL" | "LR";
  customColor?: {
    apply: boolean;
    color?: string;
  };
}

export function ProgressBar({
  timestamps,
  maxTime,
  direction = "LR",
  customColor,
}: ProgressBarProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(interval);
  }, []);

  const { progress, displayProgress, timeRemaining } = useMemo(() => {
    if (!timestamps.length) {
      return { progress: 0, displayProgress: 0, timeRemaining: null };
    }

    const oldestTimestamp = Math.min(...timestamps);
    const totalTime = maxTime * 1000;
    const elapsed = now - oldestTimestamp;
    const rawProgress = Math.min((elapsed / totalTime) * 100, 100);
    const remaining = Math.max(0, totalTime - elapsed);

    const displayProgress =
      direction === "RL" ? 100 - rawProgress : rawProgress;

    return {
      progress: rawProgress,
      displayProgress,
      timeRemaining: remaining,
    };
  }, [timestamps, maxTime, now, direction]);

  function formatTimeRemaining(ms: number): string {
    if (ms <= 0) return "Ready to harvest! 🌾";
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m remaining`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s remaining`;
    return `${seconds}s remaining`;
  }

  // TODO: implement size styling
  function progressStyle(
    direction: "LR" | "RL",
    defaultColor: boolean = true,
    customColor?: string,
  ): string {
    let backgroundStyle;

    if (defaultColor && direction == "RL") {
      backgroundStyle = "from-red-400 via-amber-400 to-orange-400";
    } else if (defaultColor && direction === "LR") {
      backgroundStyle = "from-lime-400 via-green-300 to-teal-300";
    } else {
      backgroundStyle = customColor;
    }

    return cn(
      "h-full transition-all duration-300 shadow-inner ease-out rounded-md",
      "bg-gradient-to-r",
      backgroundStyle,
    );
  }

  return (
    <div className='flex flex-col justify-center align-center relative w-full group'>
      <div className='w-full h-1/3 bg-white shadow-inner rounded-md overflow-hidden'>
        <div
          className={(() =>
            progressStyle(
              direction,
              !customColor?.apply,
              customColor?.color,
            ))()}
          style={{
            width: `${displayProgress}%`,
          }}
        />
      </div>

      {/* Tooltip - shows on hover */}
      {timestamps.length > 0 && (
        <div
          className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                      bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 
                      transition-opacity pointer-events-none whitespace-nowrap z-10'
        >
          <span>{`🌱 ${formatTimeRemaining(timeRemaining!)}`}</span>
          <div
            className='absolute top-full left-1/2 -translate-x-1/2 
                        border-4 border-transparent border-t-black'
          />
        </div>
      )}
    </div>
  );
}
