// libraries
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
// logic
import { CropField, CropType } from "../logic/crops";
// other stores
import { usePlayerStore } from "./player-store";
import { reviveStoredItem } from "../utils/reviveItem";

export type ActiveCropField = CropField & {
  id: number;
};

interface CropStore {
  fields: ActiveCropField[];
  nextID: number;
  getID: () => number;
  targetField: (plotID: number) => [number, ActiveCropField];
  addField: (name: string, capacity: number, crop: CropType) => ActiveCropField;
  plantCrop: (plantID: number, crops: number) => void;
  harvestCrops: (plotID: number) => void;
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
      targetField: (plotID: number): [number, ActiveCropField] => {
        const fields = get().fields;
        // It stands for "Target Field Index" but I didn't want to type
        // such a mouthful
        const tFIndex = fields.findIndex((f) => f.id === plotID);

        // returns both the index and the active crop field
        // reference. The reference exists for calculations
        // but the index is for actual access.
        return [tFIndex, fields[tFIndex]];
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
        // console.log(activeField);
        return activeField;
      },

      plantCrop: (plotID: number, crops: number) => {
        const target = get().targetField(plotID);
        if (target[0] === -1) return;

        const futureValue = target[1].amount.planted + crops;

        set((state) => {
          state.fields[target[0]].amount.planted = Math.min(
            futureValue,
            target[1].amount.capacity,
          );
        });
      },

      harvestCrops: (plotID: number) => {
        const target = get().targetField(plotID);

        if (target[0] === -1) return;

        if (target[1].amount.planted === 0) return;

        const crop = target[1].assignedCrop;
        const amount = target[1].amount.planted;

        set((state) => {
          state.fields[target[0]].amount.planted = 0;
        });

        usePlayerStore.getState().addToInventory({ ...crop, amount }, amount);
      },
    })),
    {
      name: "crop-field-data",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state: CropStore | undefined) => {
        if (!state) return;
        state.fields = state.fields.map((field) => ({
          ...field,
          assignedCrop: {
            ...field.assignedCrop,
            value: reviveStoredItem({ ...field.assignedCrop, amount: 0 }).value,
          },
        }));
      },
    },
  ),
);
