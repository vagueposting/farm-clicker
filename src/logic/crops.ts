import { PriceHandling } from "./priceHandling";

import { Currencies } from "./types-and-templates/game-operations";

export class CropType {
  name: string;
  description: string;
  value: {
    buy: PriceHandling;
    sell: PriceHandling;
  };
  growTime: number;
  unlocked: boolean;

  constructor(
    name: string,
    description: string,
    value: {
      buy: PriceHandling;
      sell: PriceHandling;
    },
    growTime: number,
    unlocked: boolean,
  ) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.growTime = growTime;
    this.unlocked = unlocked;
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
