import { useCropStore } from "./stores/crop-store";

let initialized = false;
/**
 * To be run at the start of App.jsx
 */
export function init() {
  if (initialized) return;
  // Load all item data from the json files in src/data
  // and rehydrate them by checking the conditions

  if (localStorage.getItem("crop-field-data") === null) {
    // create the first field using addField()
    // if there is no crop save data
  }

  initialized = true;
}
