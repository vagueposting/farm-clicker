import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { Player } from "../logic/player";
import { Character } from "../logic/character";
import type {
  WalletPockets,
  ScoreOperation,
} from "../logic/types-and-templates/game-operations";

interface PlayerStore {
  name: string;
  pronouns: string; // or your Pronoun type
  wallet: {
    money: number;
    diamonds: number;
  };
  modifyWallet: (
    pocket: WalletPockets,
    amount: number,
    dir: ScoreOperation,
  ) => void;
}

export const usePlayerStore = create()(
  persist(
    immer((set, get) => ({
      name: Player.name,
      pronouns: Player.pronouns,
      wallet: Player.wallet,

      modifyWallet: (
        pocket: WalletPockets,
        amount: number,
        dir: ScoreOperation,
      ) => {
        const newBalance = Player.changeWalletBalance(pocket, amount, dir);
        set((state: PlayerStore) => {
          state.wallet[pocket] = newBalance;
        });
      },
    })),
    {
      name: "player-data",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
