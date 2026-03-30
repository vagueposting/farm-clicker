// libraries
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
// logic
import { Player, rehydratePlayer } from "../logic/player";
// types
import { ScoreOperation } from "../logic/types-and-templates/game-operations";
import type { Pronoun } from "../logic/types-and-templates/pronouns-and-genders";
import type {
  StoredItem,
  Inventory,
  Money,
  Diamonds,
} from "../logic/types-and-templates/game-operations";
import { PriceHandling } from "../logic/priceHandling";
import { Currencies } from "../logic/types-and-templates/game-operations";
import { reviveStoredItem } from "../utils/reviveItem";

type ItemManipulation = (item: StoredItem, amount: number) => void;

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
  addToInventory: ItemManipulation;
  useItem: ItemManipulation;
  sellItem: ItemManipulation;
  syncFromPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    immer((set, get) => ({
      name: Player.name,
      pronouns: Player.pronouns,
      wallet: { ...Player.wallet },
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

      // FIXME: Issue where wallet value becomes null or NaN when you spend
      // I think it's here but I am not sure.
      modifyWallet: (pocket, amount, dir) => {
        set((state: PlayerStore) => {
          /* console.log("modifyWallet called");
          console.log("  pocket:", JSON.stringify(pocket));
          console.log("  full wallet object:", JSON.stringify(state.wallet));
          console.log("  wallet[pocket]:", state.wallet[pocket]);
          console.log("  typeof wallet[pocket]:", typeof state.wallet[pocket]); */
          const current = state.wallet[pocket];
          if (current === undefined || current === null) {
            console.error(
              `modifyWallet: wallet["${pocket}"] is ${current}. ` +
                `Check that Currencies enum values match wallet keys exactly.`,
            );
            return;
          }
          if (dir === ScoreOperation.minus && current - amount < -500) return;
          state.wallet[pocket] =
            dir === ScoreOperation.plus ? current + amount : current - amount;
        });
      },
      addToInventory: (item: StoredItem, amount: number) => {
        if (get().inventory[item.id]) {
          set((state) => {
            state.inventory[item.id].amount += amount;
          });
        } else {
          set((state) => {
            state.inventory[item.id] = { ...item, amount };
          });
        }
        return;
      },
      useItem: (item: StoredItem, amount: number) => {
        if (get().inventory[item.id]) {
          set((state) => {
            state.inventory[item.id].amount -= amount;
          });
        }

        return;
      },
      sellItem: (item: StoredItem, amount: number) => {
        // Read BEFORE any set() call, while PriceHandling instances are still intact
        const entry = get().inventory[item.id];
        if (!entry) return;

        const price = entry.value.sell.finalPrice; // getter exists here ✓
        const currency = entry.value.sell.currency;

        // Now mutate
        set((state) => {
          state.inventory[item.id].amount -= amount;
          const current = state.wallet[currency];
          state.wallet[currency] = current + price * amount;
        });
      },
      syncFromPlayer: () => {
        set((state: PlayerStore) => {
          state.name = Player.name;
          state.pronouns = Player.pronouns;
          state.wallet = { ...Player.wallet };
        });
      },
    })),
    {
      name: "player-data",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state: PlayerStore | undefined) => {
        /* console.log("⏱️ onRehydrateStorage FIRED at:", Date.now());
        console.log("RAW rehydrated state:", JSON.stringify(state?.wallet));
        console.log("RAW wallet.money type:", typeof state?.wallet?.money);
        console.log(
          "RAW wallet.diamonds type:",
          typeof state?.wallet?.diamonds,
        ); */
        if (state) {
          for (const key in state.inventory) {
            const raw = state.inventory[key];
            // raw.value.buy/sell are plain objects with baseValue, modifiers, currency
            // We need to reconstruct PriceHandling instances from them
            const revivedItem = {
              ...raw,
              value: reviveStoredItem(raw).value,
            } as StoredItem;
            state.inventory[key] = revivedItem;
          }
          rehydratePlayer(state);
          /* console.log(
            "Player.wallet AFTER rehydratePlayer:",
            JSON.stringify(Player.wallet),
          ); */
        }
      },
    },
  ),
);
