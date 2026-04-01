import { usePlayerStore } from "../stores/player-store";
import { useState } from "react";
import { cn } from "../utils/cn";

interface PlayerStatProps {
  position?: string;
}

export function PlayerStats({ position }: PlayerStatProps) {
  const { wallet } = usePlayerStore();
  const [folded, setFold] = useState(true);

  function handleFolding(e: React.MouseEvent) {
    e.stopPropagation();
    if (folded) {
      setFold(false);
    } else {
      setFold(true);
    }
  }

  let div;
  const headerStyle =
    "flex flex-row justify-center align-middle cursor-pointer";
  const shadow = "shadow-lg";

  if (folded) {
    const header = cn(headerStyle, shadow, "bg-gray-200");
    div = (
      <div className={position}>
        <div onClick={handleFolding} className={header}>
          <span>Info</span>{" "}
          <span className='material-icons-round'>arrow_drop_down</span>
        </div>
      </div>
    );
  } else {
    const headerClasses = cn(headerStyle, "bg-cyan-500 cursor-pointer");
    const divClass = cn(position, "bg-white h-auto", shadow);
    div = (
      <div className={divClass}>
        <div onClick={handleFolding} className={headerClasses}>
          <span className='text-white'>Info</span>{" "}
          <span className='material-icons-round text-white'>arrow_drop_up</span>
        </div>
        <div className='pl-2 pt-2'>
          <span className='font-bold'>Balance</span>
          <ul className='pl-3'>
            <li>${wallet.money}</li>
            <li className='flex flex-row align-middle'>
              <span className='material-icons-round scale-90'>diamond</span>{" "}
              {wallet.diamonds}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return div;
}
