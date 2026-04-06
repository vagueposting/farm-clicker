import { useState, useEffect, useMemo } from "react";

interface ProgressBarProps {
  timestamps: number[];
  maxTime: number; // in seconds
}

export function ProgressBar({ timestamps, maxTime }: ProgressBarProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(interval);
  }, []);

  const { progress, timeRemaining, isGrowing } = useMemo(() => {
    if (!timestamps.length) {
      return { progress: 0, timeRemaining: null, isGrowing: false };
    }

    const oldestPlant = Math.min(...timestamps);
    const totalTime = maxTime * 1000;
    const elapsed = now - oldestPlant;
    const progress = Math.min((elapsed / totalTime) * 100, 100);
    const remaining = Math.max(0, totalTime - elapsed);

    return {
      progress,
      timeRemaining: remaining,
      isGrowing: progress < 100 && progress > 0,
    };
  }, [timestamps, maxTime, now]);

  const formatTimeRemaining = (ms: number): string => {
    if (ms <= 0) return "Ready to harvest! 🌾";
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m remaining`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s remaining`;
    return `${seconds}s remaining`;
  };

  return (
    <div className='relative w-full group'>
      <div className='w-full bg-zinc-50 rounded-md overflow-hidden h-4'>
        <div
          className='bg-lime-400 h-full transition-all duration-300 ease-out rounded-md'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tooltip - shows on hover */}
      {timestamps.length > 0 && (
        <div
          className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                      bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 
                      transition-opacity pointer-events-none whitespace-nowrap z-10'
        >
          {progress >= 100
            ? "🌾 Ready to harvest!"
            : `🌱 ${formatTimeRemaining(timeRemaining!)}`}
          <div
            className='absolute top-full left-1/2 -translate-x-1/2 
                        border-4 border-transparent border-t-black'
          />
        </div>
      )}
    </div>
  );
}
