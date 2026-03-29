import { PriceHandling } from "../priceHandling";

export enum ScoreOperation {
  plus = "PLUS",
  minus = "MINUS",
}

export interface Modifiers {
  flatAdd: (base: number) => number;
  multiplier: (base: number) => number;
}

export interface ModifierConfig {
  flatAdd: number;
  multiplier: number;
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

export interface ItemData {
  name: string;
  id: number;
  description: string;
  category: ItemCats;
  rarity: Rarities;
  currency: Currencies;
  value: {
    buy: { baseValue: number; modifiers?: Partial<ModifierConfig> };
    sell: { baseValue: number; modifiers?: Partial<ModifierConfig> };
  };
  conditions?: { unlocked: boolean; canBeSold: boolean };
}

export class Item {
  name: string;
  id: number;
  description: string;
  category: ItemCats;
  rarity: Rarities;
  value: { buy: PriceHandling; sell: PriceHandling };
  conditions: { unlocked: boolean; canBeSold: boolean };

  constructor(data: ItemData) {
    console.log("Item constructor data.currency:", data.currency);
    this.name = data.name;
    this.id = data.id;
    this.description = data.description;
    this.category = data.category;
    this.rarity = data.rarity;
    this.value = {
      buy: new PriceHandling(
        data.value.buy.baseValue,
        data.currency,
        data.value.buy.modifiers,
      ),
      sell: new PriceHandling(
        data.value.sell.baseValue,
        data.currency,
        data.value.sell.modifiers,
      ),
    };
    this.conditions = data.conditions ?? { unlocked: true, canBeSold: true };
  }

  static fromJSON(raw: unknown): Item {
    return new Item(raw as ItemData);
  }
}

// for items inside of inventories
export type StoredItem = Item & {
  amount: number;
};

export type Inventory = Record<number, StoredItem>;

// Currency types
export type Money = number;
export type Diamonds = number;
export enum Currencies {
  MONEY = "money",
  DIAMONDS = "diamonds",
}
