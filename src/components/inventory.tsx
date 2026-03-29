import { cn } from "../utils/cn";
import type {
  Item,
  Inventory,
} from "../logic/types-and-templates/game-operations";
import { usePlayerStore } from "../stores/player-store";

interface InventoryProps {
  extraClasses: string;
}

interface ItemProps {
  item: Item;
}

export function Inventory({ extraClasses }: InventoryProps) {
  const { inventory } = usePlayerStore();
  const classList = cn(extraClasses, "flex flex-col gap-1");

  return (
    <div className={classList}>
      <h1>Inventory</h1>
      {Array.from(inventory.values()).map((item) => (
        <ItemDiv key={item.id} item={item} />
      ))}
    </div>
  );
}

function ItemDiv({ item }: ItemProps) {
  return (
    <div>
      <b>{item.name}</b> - {item.amount}
    </div>
  );
}
