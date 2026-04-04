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
  updateGrowth: () => void;
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

        const currentPlanted = target[1].amount.planted;
        const availableSpace = target[1].amount.capacity - currentPlanted;
        const plantAmount = Math.min(crops, availableSpace);

        if (plantAmount <= 0) return;

        const now = Date.now();

        set((state) => {
          if (!state.fields[target[0]].plantedTimestamps) {
            state.fields[target[0]].plantedTimestamps = [];
          }

          for (let i = 0; i < plantAmount; i++) {
            state.fields[target[0]].plantedTimestamps.push(now);
          }

          state.fields[target[0]].amount.planted += plantAmount;
        });
      },
      harvestCrops: (plotID: number) => {
        const target = get().targetField(plotID);

        if (target[0] === -1) return;

        const sproutedAmount = target[1].amount.sprouted;
        if (sproutedAmount === 0) return;

        const crop = target[1].assignedCrop;

        set((state) => {
          state.fields[target[0]].amount.sprouted = 0;
        });

        usePlayerStore
          .getState()
          .addToInventory({ ...crop, amount: sproutedAmount }, sproutedAmount);
      },
      updateGrowth: () => {
        const now = Date.now();
        set((state) => {
          state.fields.forEach((field) => {
            const { plantedTimestamps, assignedCrop } = field;

            if (!plantedTimestamps) return;

            const readyIndices: number[] = [];

            plantedTimestamps.forEach((timestamp, index) => {
              if (now - timestamp >= assignedCrop.growTime * 1000) {
                readyIndices.push(index);
              }
            });

            if (readyIndices.length > 0) {
              field.amount.sprouted += readyIndices.length;
              field.amount.planted -= readyIndices.length;

              field.plantedTimestamps = plantedTimestamps.filter(
                (_, index) => !readyIndices.includes(index),
              );
            }
          });
        });
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
