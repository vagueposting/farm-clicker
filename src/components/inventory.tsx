import { cn } from "../utils/cn";
import type {
  StoredItem,
  Inventory,
} from "../logic/types-and-templates/game-operations";
import { usePlayerStore } from "../stores/player-store";

interface InventoryProps {
  extraClasses: string;
}

interface ItemProps {
  item: StoredItem;
}

export function Inventory({ extraClasses = "" }: InventoryProps) {
  const { inventory } = usePlayerStore();
  const classList = cn(extraClasses, "flex flex-col gap-1");

  const processedInv = Object.values(inventory);

  return (
    <div className={classList}>
      <h1>
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
    <div>
      <span className='font-bold'>{item.name}</span> - {item.amount}
    </div>
  );
}
