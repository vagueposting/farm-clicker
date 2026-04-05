import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

// Player info model state
// Done externally to playerStats.tsx so other features
// Can toggle it or not.

interface ModalStore {
  modalFolded: boolean;
  autoOpenOnStartup: boolean;
  autoOpenOnSell: boolean;
  flipModal: () => void;
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
    })),
    {
      name: "player-modal-data",
      storage: createJSONStorage(() => localStorage),
      // TODO: implement these into a settings feature
    },
  ),
);
