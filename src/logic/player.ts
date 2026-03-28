import { Character } from "./character";
import type { Pronoun } from "./types-and-templates/pronouns-and-genders";
import type {
  Item,
  Inventory,
  Money,
  Diamonds,
} from "./types-and-templates/game-operations";

export const Player = new Character("???", {
  e: "they",
  ir: "them",
  is: "their",
  irself: "themself",
  plural: true,
});

export const rehydratePlayer = (data: {
  name: string;
  pronouns: Pronoun;
  wallet: { money: Money; diamonds: Diamonds };
  inventory: Inventory;
}) => {
  Player.name = data.name;
  Player.pronouns = data.pronouns;
  Player.wallet = data.wallet;
  Player.inventory = data.inventory;
};
