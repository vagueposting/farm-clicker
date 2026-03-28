// libraries
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
// logic
import { CropField, CropType } from "../logic/crops";

type ActiveCropField = CropField & {
  id: number;
};

interface CropStore {
  fields: ActiveCropField[];
  nextID: number;
  getID: () => number;
  addField: (name: string, capacity: number, crop: CropType) => ActiveCropField;
  plantCrop: (plantID: number, crops: number) => void;
}

export const useCropStore = create<CropStore>()(
  persist(
    immer((set, get) => ({
      fields: [],

      // Utility values
      nextID: 0,

      // Utility functions
      getID: () => {
        const id = get().nextID;
        set((state) => {
          state.nextID++;
        });
        return id;
      },

      // Actual functions for gameplay
      addField: (
        name: string,
        capacity: number,
        crop: CropType,
      ): ActiveCropField => {
        const newField = new CropField(name, capacity, crop);
        const id = get().getID();
        const activeField = { ...newField, id };
        set((state) => {
          state.fields.push(activeField);
        });
        return activeField;
      },

      plantCrop: (plotID: number, crops: number) => {
        const fields = get().fields;
        // It stands for "Target Field Index" but I didn't want to type
        // such a mouthful
        const tFIndex = fields.findIndex((f) => f.id === plotID);

        if (tFIndex === -1) return;

        const field = fields[tFIndex];
        const futureValue = fields[tFIndex].amount.planted + crops;

        set((state) => {
          state.fields[tFIndex].amount.planted = Math.min(
            futureValue,
            field.amount.capacity,
          );
        });
      },
    })),
    {
      name: "crop-field-data",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state: CropStore | undefined) => {
        if (state) {
          // TODO: add a crop field rehydration func
        }
      },
    },
  ),
);
