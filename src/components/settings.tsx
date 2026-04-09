import { useStatModalStore } from "../stores/player-info-modal";

interface SettingToggleProps {
  reference: boolean;
  setting: string;
  toggleFn: (setting: string) => void;
}

export function SettingsMenu() {
  // Call all settings
  const { toggleModalSettings } = useStatModalStore();

  return <></>;
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
