import type { Crop } from "./types-and-templates/crop-type";
import type { Money, Diamonds } from "./types-and-templates/game-operations";

class CropType implements Crop {
  name: string;
  description: string;
  quantity: number;
  value: {
    buy: Money | Diamonds;
    sell: Money | Diamonds;
  };
  growTime: number;
  unlocked: boolean;

  constructor(
    name: string,
    description: string,
    value: Crop["value"],
    growTime: number,
    unlocked: boolean,
  ) {
    this.name = name;
    this.description = description;
    this.quantity = 0;
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
  assignedCrop: Crop;

  constructor(name: string, capacity: number, crop: Crop) {
    this.name = name;
    this.amount = {
      planted: 0,
      capacity: capacity,
    };
    this.assignedCrop = crop;
  }
}
