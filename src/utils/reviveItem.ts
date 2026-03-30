import type { StoredItem } from "../logic/types-and-templates/game-operations";
import { PriceHandling } from "../logic/priceHandling";

export function reviveStoredItem(raw: StoredItem): StoredItem {
  return {
    ...raw,
    value: {
      buy: new PriceHandling(
        raw.value.buy.baseValue,
        raw.value.buy.currency,
        raw.value.buy.modifiers,
      ),
      sell: new PriceHandling(
        raw.value.sell.baseValue,
        raw.value.sell.currency,
        raw.value.sell.modifiers,
      ),
    },
  };
}
