import type {
  Modifiers,
  Currencies,
} from "./types-and-templates/game-operations";

export class PriceHandling {
  baseValue: number;
  modifiers: Modifiers;
  currency: Currencies;

  constructor(baseValue: number, currency: Currencies) {
    this.baseValue = baseValue;
    this.modifiers = {
      flatAdd: (base) => base + 0,
      multiplier: (base) => base * 1,
    };
    this.currency = currency;
  }
}
