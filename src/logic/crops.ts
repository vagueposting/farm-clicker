import { PriceHandling } from "./priceHandling";
import { Item } from "./types-and-templates/game-operations";
import type { ItemData, Rarities } from "./types-and-templates/game-operations";
import { ItemCats } from "./types-and-templates/game-operations";

export class CropType extends Item {
  growTime: number;

  constructor(data: ItemData & { growTime: number }) {
    super({
      ...data,
      category: ItemCats.Crops, // always force category
      conditions: data.conditions ?? { unlocked: false, canBeSold: true },
    });
    this.growTime = data.growTime;
  }

  static fromJSON(raw: unknown): CropType {
    return new CropType(raw as ItemData & { growTime: number });
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
