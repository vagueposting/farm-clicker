// libraries
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
// logic
import { Player, rehydratePlayer } from "../logic/player";
// types
import type {
  WalletPockets,
  ScoreOperation,
} from "../logic/types-and-templates/game-operations";
import type { Pronoun } from "../logic/types-and-templates/pronouns-and-genders";
import type {
  Money,
  Diamonds,
} from "../logic/types-and-templates/game-operations";

interface PlayerStore {
  name: string;
  pronouns: Pronoun;
  wallet: {
    money: Money;
    diamonds: Diamonds;
  };
  changeName: (newName: string) => void;
  changePronouns: (newPronouns: Pronoun) => void;
  modifyWallet: (
    pocket: WalletPockets,
    amount: number,
    dir: ScoreOperation,
  ) => void;
  syncFromPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    immer((set, get) => ({
      name: Player.name,
      pronouns: Player.pronouns,
      wallet: Player.wallet,

      changeName: (newName: string) => {
        set((state: PlayerStore) => {
          state.name = newName;
        });
      },

      changePronouns: (newPronouns: Pronoun) => {
        set((state: PlayerStore) => {
          state.pronouns = newPronouns;
        });
      },

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
      syncFromPlayer: () => {
        set((state: PlayerStore) => {
          state.name = Player.name;
          state.pronouns = Player.pronouns;
          state.wallet = Player.wallet;
        });
      },
    })),
    {
      name: "player-data",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state: PlayerStore | undefined) => {
        if (state) {
          rehydratePlayer(state);
        }
      },
    },
  ),
);
