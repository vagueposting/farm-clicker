import type { SettingConfig } from "../components/settings";
import { useStatModalStore } from "../stores/player-info-modal";

export function generateSettingList(): SettingConfig[] {
  const { autoOpenOnStartup, autoOpenOnSell, toggleModalSettings } =
    useStatModalStore.getState();

  const settings: SettingConfig[] = [
    {
      title: "Open modal on startup",
      description: "The player info modal immediately opens on startup",
      category: "Appearance",
      setting: {
        type: "toggle",
        reference: autoOpenOnStartup,
        settingParam: "toggleOnStartup",
        toggleFn: toggleModalSettings,
      },
    },
    {
      title: "Open modal on sell",
      description:
        "The player info modal automatically opens when you sell an item.",
      category: "Appearance",
      setting: {
        type: "toggle",
        reference: autoOpenOnSell,
        settingParam: "toggleOnSell",
        toggleFn: toggleModalSettings,
      },
    },
  ];

  return settings;
}
