import type { Money, Diamonds } from "./game-operations";

export interface Crop {
  name: string;
  description: string;
  quantity: number;
  value: {
    buy: Money | Diamonds;
    sell: Money | Diamonds;
  };
  growTime: number;
  unlocked: boolean;
}
