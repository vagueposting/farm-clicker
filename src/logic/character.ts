import type { Pronoun } from "./types-and-templates/pronouns";

enum ScoreOperation {
  plus = "PLUS",
  minus = "MINUS",
}

enum WalletPockets {
  MONEY = "money",
  DIAMONDS = "diamonds",
}

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
  }
}
