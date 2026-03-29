import {
  ModifierConfig,
  Currencies,
} from "./types-and-templates/game-operations";

export class PriceHandling {
  baseValue: number;
  modifiers: ModifierConfig;
  currency: Currencies;

  constructor(
    baseValue: number,
    currency: Currencies,
    modifiers?: Partial<ModifierConfig>,
  ) {
    this.baseValue = baseValue;
    this.currency = currency;
    this.modifiers = {
      flatAdd: modifiers?.flatAdd ?? 0,
      multiplier: modifiers?.multiplier ?? 1,
    };
  }

  get finalPrice(): number {
    return (
      (this.baseValue + this.modifiers.flatAdd) * this.modifiers.multiplier
    );
  }
}
