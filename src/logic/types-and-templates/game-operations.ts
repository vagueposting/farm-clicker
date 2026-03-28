export enum ScoreOperation {
  plus = "PLUS",
  minus = "MINUS",
}

export enum WalletPockets {
  MONEY = "money",
  DIAMONDS = "diamonds",
}

export interface Modifiers {
  flatAdd: (base: number) => number;
  multiplier: (base: number) => number;
}

// Currency types
export type Money = number;
export type Diamonds = number;
export enum Currencies {
  MONEY = "MONEY",
  DIAMONDS = "DIAMONDS",
}
