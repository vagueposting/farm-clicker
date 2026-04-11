import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

// Player info model state
// Done externally to playerStats.tsx so other features
// Can toggle it or not.

export type ModalSettings = "toggleOnStartup" | "toggleOnSell";

interface ModalStore {
  modalFolded: boolean;
  autoOpenOnStartup: boolean;
  autoOpenOnSell: boolean;
  flipModal: () => void;
  toggleModalSettings: (setting: ModalSettings) => void;
}

export const useStatModalStore = create<ModalStore>()(
  persist(
    immer((set) => ({
      modalFolded: true,
      autoOpenOnStartup: false,
      autoOpenOnSell: true,
      flipModal: () => {
        set((state) => {
          state.modalFolded = !state.modalFolded;
        });
      },
      toggleModalSettings: (setting) => {
        switch (setting) {
          case "toggleOnSell":
            set((state) => {
              state.autoOpenOnSell = !state.autoOpenOnSell;
            });
            break;
          case "toggleOnStartup":
            set((state) => {
              state.autoOpenOnStartup = !state.autoOpenOnStartup;
            });
            break;
          default:
            throw new Error(
              `toggleModalSettings() - The setting being called (${setting}) is not valid.`,
            );
        }
      },
    })),
    {
      name: "player-modal-data",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state: ModalStore | undefined) => {
        if (state) {
          state.modalFolded = true;
        }
      },
    },
  ),
);
