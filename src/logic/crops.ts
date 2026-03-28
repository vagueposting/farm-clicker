import { PriceHandling } from "./priceHandling";
import type { Item, Rarities } from "./types-and-templates/game-operations";
import { ItemCats } from "./types-and-templates/game-operations";

export class CropType implements Item {
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
  growTime: number;
  conditions: {
    unlocked: boolean;
    canBeSold: boolean;
  };

  constructor(
    name: string,
    id: number,
    description: string,
    rarity: Rarities,
    value: {
      buy: PriceHandling;
      sell: PriceHandling;
    },
    growTime: number,
  ) {
    this.name = name;
    this.id = id;
    this.rarity = rarity;
    this.amount = 0;
    this.description = description;
    this.category = ItemCats.Crops;
    this.value = value;
    this.conditions = {
      unlocked: false,
      canBeSold: true,
    };
    this.growTime = growTime;
  }
}

export class CropField {
  name: string;
  amount: {
    planted: number;
    capacity: number;
  };
  assignedCrop: CropType;

  constructor(name: string, capacity: number, crop: CropType) {
    this.name = name;
    this.amount = {
      planted: 0,
      capacity: capacity,
    };
    this.assignedCrop = crop;
  }
}
