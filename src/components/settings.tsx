import { useStatModalStore } from "../stores/player-info-modal";
import type { ModalSettings } from "../stores/player-info-modal";

interface SettingToggleProps {
  reference: boolean;
  setting: string;
  toggleFn: (setting: any) => void;
}

export function SettingsMenu() {
  // Call all settings
  const { autoOpenOnSell, autoOpenOnStartup, toggleModalSettings } =
    useStatModalStore();

  return (
    <>
      <dialog id='settings'>
        <SettingToggle
          reference={autoOpenOnStartup}
          setting='toggleOnStartup'
          toggleFn={toggleModalSettings}
        />
      </dialog>
    </>
  );
}

function SettingToggle({ reference, setting, toggleFn }: SettingToggleProps) {
  function handleOnChange() {
    toggleFn(setting);
  }
  return (
    <>
      <input
        type='checkbox'
        className='toggle'
        checked={reference}
        onChange={handleOnChange}
      />
    </>
  );
}

function SearchSetting() {}
