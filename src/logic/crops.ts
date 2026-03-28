import { PriceHandling } from "./priceHandling";
import type { Item, Rarities } from "./types-and-templates/game-operations";

export class CropType implements Item {
  name: string;
  id: number;
  rarity: Rarities;
  description: string;
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
    conditions: {
      canBeSold: boolean;
      unlocked: boolean;
    },
    growTime: number,
  ) {
    this.name = name;
    this.id = id;
    this.rarity = rarity;
    this.description = description;
    this.value = value;
    this.conditions = conditions;
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
