import { PriceHandling } from "../priceHandling";

export enum ScoreOperation {
  plus = "PLUS",
  minus = "MINUS",
}

export interface Modifiers {
  flatAdd: (base: number) => number;
  multiplier: (base: number) => number;
}

export enum Rarities {
  C = "Common",
  UC = "Uncommon",
  R = "Rare",
  SR = "Super Rare",
  SSR = "Supreme Rare",
}

export interface Item {
  name: string;
  id: number;
  description: string;
  rarity: Rarities;
  value: {
    buy: PriceHandling;
    sell: PriceHandling;
  };
  conditions: {
    unlocked: boolean;
    canBeSold: boolean;
  };
}

// Currency types
export type Money = number;
export type Diamonds = number;
export enum Currencies {
  MONEY = "money",
  DIAMONDS = "diamonds",
}
