import type { Pronoun } from "./types-and-templates/pronouns-and-genders";
import type {
  ScoreOperation,
  Item,
  Money,
  Diamonds,
  Currencies,
} from "./types-and-templates/game-operations";

export class Character {
  name: string;
  pronouns: Pronoun;
  wallet: {
    money: Money;
    diamonds: Diamonds;
  };
  inventory: Item[];
  constructor(name: string, pronouns: Pronoun) {
    this.name = name;
    this.pronouns = pronouns;
    this.wallet = {
      money: 0,
      diamonds: 0,
    };
    this.inventory = [];
  }

  changeWalletBalance(
    pocket: Currencies,
    amount: number,
    operation: ScoreOperation,
  ) {
    if (operation === "PLUS") {
      this.wallet[pocket] += amount;
    } else {
      this.wallet[pocket] -= amount;
    }

    return this.wallet[pocket];
  }
}
