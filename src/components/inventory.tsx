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
  );

  const processedInv = Object.values(inventory);

  return (
    <div className={classList}>
      <h1 className='text-xl'>
        <b>Inventory</b>
      </h1>
      {processedInv.map((item) => (
        <ItemDiv key={item.id} item={item} />
      ))}
    </div>
  );
}

function ItemDiv({ item }: ItemProps) {
  return (
    <div className='flex flex-col p-2 bg-gray-50 border-black border-2'>
      <div className='flex justify-left items-center gap-1'>
        <span className='font-bold text-lg'>{item.name}</span> - {item.amount}
      </div>
      <p className='h-16 text-xs overflow-y-scroll'>{item.description}</p>
      <SellItem quantity={1} item={item} />
    </div>
  );
}

// TODO: write handleSell()
function SellItem({ quantity, item }: SellProps) {
  const { sellItem } = usePlayerStore();

  function handleSell() {
    sellItem(item, quantity);
  }

  return (
    <button
      className='bg-gray-300 p-1 m-2 cursor-pointer'
      onClick={handleSell}
      disabled={item.amount === 0}
    >
      Sell Item
    </button>
  );
}
