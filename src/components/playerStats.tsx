import { usePlayerStore } from "../stores/player-store";
import { useState } from "react";
import { cn } from "../utils/cn";
import { motion } from "motion/react";

interface PlayerStatProps {
  dragConstraints: React.RefObject<HTMLDivElement | null>;
}

export function PlayerStats({ dragConstraints }: PlayerStatProps) {
  const { wallet } = usePlayerStore();
  const [folded, setFold] = useState(true);

  const handleFolding = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFold(!folded);
  };

  // Ensure 'top-0 left-0' is set so the element's origin
  // matches the Container's origin exactly.
  const boxClass = cn(
    "absolute top-0 left-0 shadow-lg z-10 w-40 cursor-pointer",
    folded ? "bg-gray-400" : "bg-white h-auto",
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0}
      className={boxClass}
    >
      <div
        onClick={handleFolding}
        className={cn(
          "flex justify-between align-middle pl-2 pr-2 font-bold",
          !folded && "bg-sky-400 text-white",
        )}
      >
        <span>{folded ? "Info" : "Test"}</span>
        <span className='material-icons-round'>
          {folded ? "arrow_drop_down" : "arrow_drop_up"}
        </span>
      </div>

      {!folded && (
        <div className='p-1 text-black'>
          <p className='flex justify-between align-middle'>
            <span className='font-bold'>Money</span> ${wallet.money}
          </p>
          <p className='flex justify-between align-middle'>
            <span className='font-bold'>Diamonds</span>{" "}
            <span className='flex align-middle'>
              <span className='material-icons-round scale-75'>diamond</span>
              {wallet.diamonds}
            </span>
          </p>
        </div>
      )}
    </motion.div>
  );
}
