import { cn } from "../utils/cn";
import type {
  StoredItem,
  Inventory,
} from "../logic/types-and-templates/game-operations";
import { usePlayerStore } from "../stores/player-store";

interface InventoryProps {
  extraClasses?: string;
}

interface ItemProps {
  item: StoredItem;
}

interface SellProps {
  quantity: number;
  item: StoredItem;
}

export function Inventory({ extraClasses = "" }: InventoryProps) {
  const { inventory } = usePlayerStore();
  const classList = cn(
    extraClasses,
    "bg-gray-200",
    "flex flex-col gap-3 p-2 h-full",
    "overflow-y-auto",
  );

  const processedInv = Object.values(inventory).filter((i) => i.amount > 0);

  return (
    <div className={classList}>
      <h1 className='text-xl'>
        <b className='font-mono text-lg'>Inventory</b>
      </h1>
      {processedInv.map((item) => (
        <ItemDiv key={item.id} item={item} />
      ))}
    </div>
  );
}

function ItemDiv({ item }: ItemProps) {
  return (
    <div className='flex flex-col p-2 bg-gray-50 shadow-inner'>
      <div className='flex justify-left items-center gap-1'>
        <span className='font-bold text-md'>{item.name}</span> - {item.amount}
      </div>
      <p
        className='h-16 overflow-y-auto'
        style={{
          fontSize: "0.65rem",
          lineHeight: "0.75rem",
        }}
      >
        {item.description}
      </p>
      <SellItem quantity={1} item={item} />
    </div>
  );
}

function SellItem({ quantity, item }: SellProps) {
  const { sellItem } = usePlayerStore();

  function handleSell() {
    sellItem(item, quantity);
  }

  return (
    <button
      className='btn btn-sm bg-gray-300 border-0 p-1 w-auto self-center'
      onClick={handleSell}
      disabled={item.amount === 0}
    >
      Sell ({quantity})
    </button>
  );
}
