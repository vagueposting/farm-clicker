import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

export type KeyboardShortcuts = Record<string, string[]>;

interface HotkeyStore {
  shortcuts: KeyboardShortcuts;
  getShortcut: (shortcut: string) => string[];
  setKeyboardShortcut: (shortcut: string, newHotkey: string) => void;
}

export const useHotkeyStore = create<HotkeyStore>()(
  persist(
    immer((set, get) => ({
      shortcuts: {
        useBy5: ["ctrl"],
        useBy10: ["alt"],
        useBy50: ["ctrl+alt"],
        useBy100: ["shift"],
      },
      getShortcut: (shortcut: string) => {
        return get().shortcuts[shortcut];
      },
      setKeyboardShortcut: (shortcut: string, newHotkey: string) => {
        const target = get().getShortcut(shortcut);

        if (target.includes(newHotkey)) return;

        target.push(newHotkey);

        return;
      },
      // TODO: Hotkey sanitization? Make normalize hotkeys utility
      // TODO: checker for redundant hotkeys
    })),
    {
      name: "user-hotkeys",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
