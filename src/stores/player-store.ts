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
      modifyWallet: (
        pocket: Currencies,
        amount: number,
        dir: ScoreOperation,
      ) => {
        set((state: PlayerStore) => {
          const current = state.wallet[pocket];
          // Placeholder for bankruptcy mechanic.
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
        get().useItem(item, amount);

        const liveItem = get().inventory[item.id];
        console.log("liveItem:", liveItem);
        console.log("sell object:", liveItem?.value?.sell);
        console.log("currency:", liveItem?.value?.sell?.currency);
        console.log("finalPrice:", liveItem?.value?.sell?.finalPrice);
        const price = liveItem.value.sell.finalPrice;
        const currency = liveItem.value.sell.currency;

        get().modifyWallet(currency, price, ScoreOperation.plus);
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
        if (state) {
          for (const key in state.inventory) {
            const raw = state.inventory[key];
            // raw.value.buy/sell are plain objects with baseValue, modifiers, currency
            // We need to reconstruct PriceHandling instances from them
            const revivedItem = {
              ...raw,
              value: {
                buy: new PriceHandling(
                  raw.value.buy.baseValue,
                  raw.value.buy.currency,
                  raw.value.buy.modifiers,
                ),
                sell: new PriceHandling(
                  raw.value.sell.baseValue,
                  raw.value.sell.currency,
                  raw.value.sell.modifiers,
                ),
              },
            } as StoredItem;
            state.inventory[key] = revivedItem;
          }
          rehydratePlayer(state);
        }
      },
    },
  ),
);
