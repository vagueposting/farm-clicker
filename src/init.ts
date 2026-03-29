import { useCropStore } from "./stores/crop-store";
import { CropType } from "./logic/crops";
import cropData from "./data/crops.json";
import { enableMapSet } from "immer";

let initialized = false;

/**
 * To be run at the start of App.jsx
 */
let gameData: { crops: CropType[] } | null = null;

export function init() {
  enableMapSet();

  if (initialized && gameData) return gameData;

  // Load all item data from the json files in src/data
  // and rehydrate them.
  const crops = cropData.crops.map(CropType.fromJSON);

  if (localStorage.getItem("crop-field-data") === null) {
    // create the first field using addField()
    // if there is no crop save data
    useCropStore.getState().addField("My first field", 20, crops[0]);
  }

  initialized = true;

  // export/return the game data

  return {
    crops,
  };
}
