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

// for item definitions
export interface Item {
  name: string;
  id: number;
  description: string;
  category: ItemCats;
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

// for items inside of inventories
export type StoredItem = Item & {
  amount: number;
};

export type Inventory = Map<number, StoredItem>;

// Currency types
export type Money = number;
export type Diamonds = number;
export enum Currencies {
  MONEY = "money",
  DIAMONDS = "diamonds",
}
