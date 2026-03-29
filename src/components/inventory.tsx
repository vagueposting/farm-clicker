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

  const itemList: Item[] = [];

  // get the items and prime them for rendering
  inventory.forEach((value) => {
    itemList.push(value);
  });

  return (
    <div className={classList}>
      <h1>Inventory</h1>
      {itemList.map((i) => (
        <ItemDiv item={i} />
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
