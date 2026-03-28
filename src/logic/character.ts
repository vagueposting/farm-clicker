import type { Pronoun } from "./types-and-templates/pronouns-and-genders";
import type {
  WalletPockets,
  ScoreOperation,
} from "./types-and-templates/game-operations";

export class Character {
  name: string;
  pronouns: Pronoun;
  wallet: {
    money: number;
    diamonds: number;
  };
  constructor(name: string, pronouns: Pronoun) {
    this.name = name;
    this.pronouns = pronouns;
    this.wallet = {
      money: 0,
      diamonds: 0,
    };
  }

  changeWalletBalance(
    pocket: WalletPockets,
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
