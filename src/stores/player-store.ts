// libraries
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
// logic
import { Player, rehydratePlayer } from "../logic/player";
// types
import type { ScoreOperation } from "../logic/types-and-templates/game-operations";
import type { Pronoun } from "../logic/types-and-templates/pronouns-and-genders";
import type {
  StoredItem,
  Inventory,
  Money,
  Diamonds,
} from "../logic/types-and-templates/game-operations";
import { Currencies } from "../logic/types-and-templates/game-operations";

interface PlayerStore {
  name: string;
  pronouns: Pronoun;
  wallet: {
    money: Money;
    diamonds: Diamonds;
  };
  inventory: Inventory;
  changeName: (newName: string) => void;
  changePronouns: (newPronouns: Pronoun) => void;
  modifyWallet: (
    pocket: Currencies,
    amount: number,
    dir: ScoreOperation,
  ) => void;
  addToInventory: (item: StoredItem, amount: number) => void;
  syncFromPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    immer((set, get) => ({
      name: Player.name,
      pronouns: Player.pronouns,
      wallet: Player.wallet,
      inventory: Player.inventory,

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
        pocket: Currencies,
        amount: number,
        dir: ScoreOperation,
      ) => {
        const newBalance = Player.changeWalletBalance(pocket, amount, dir);
        set((state: PlayerStore) => {
          state.wallet[pocket] = newBalance;
        });
      },
      addToInventory: (item: StoredItem, amount: number) => {
        if (get().inventory.has(item.id)) {
          set((state) => {
            const entry = state.inventory.get(item.id);
            if (entry !== undefined && typeof entry.amount === "number")
              entry.amount += amount;
          });
        } else return;
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
