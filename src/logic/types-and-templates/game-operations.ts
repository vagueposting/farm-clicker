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

export enum ItemCats {
  Crops,
}

export interface Item {
  name: string;
  id: number;
  description: string;
  category: ItemCats;
  rarity: Rarities;
  amount: number;
  value: {
    buy: PriceHandling;
    sell: PriceHandling;
  };
  conditions: {
    unlocked: boolean;
    canBeSold: boolean;
  };
}

export type Inventory = Map<number, Item>;

// Currency types
export type Money = number;
export type Diamonds = number;
export enum Currencies {
  MONEY = "money",
  DIAMONDS = "diamonds",
}
