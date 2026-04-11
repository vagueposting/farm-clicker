// @ts-ignore
import "./settings.css";
import { useStatModalStore } from "../stores/player-info-modal";

interface SettingProps {
  title: string;
  description?: React.ReactNode;
  setting: React.ReactNode;
}

interface SettingToggleProps {
  reference: boolean;
  setting: string;
  toggleFn: (setting: any) => void;
}

export function SettingsMenu() {
  const { autoOpenOnSell, autoOpenOnStartup, toggleModalSettings } =
    useStatModalStore();

  return (
    <dialog id='settings' className='modal'>
      <div className='modal-box bg-white'>
        <h3 className='font-bold text-lg mb-4'>Settings</h3>

        <Setting
          title='Open modal on startup'
          description='This is a test description to check for styling'
          setting={
            <SettingToggle
              reference={autoOpenOnStartup}
              setting='toggleOnStartup'
              toggleFn={toggleModalSettings}
            />
          }
        />

        <Setting
          title='Open modal on sell'
          setting={
            <SettingToggle
              reference={autoOpenOnSell}
              setting='toggleOnSell'
              toggleFn={toggleModalSettings}
            />
          }
        />

        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}

function Setting({ title, description, setting }: SettingProps) {
  return (
    <div className='grid grid-rows-2 grid-cols-5'>
      <div className='flex flex-col col-start-1 col-end-5'>
        <div className='font-bold text-sm'>{title}</div>
        <div className='text-xs'>{description}</div>
      </div>
      <div className='col-start-5 col-end-6'>{setting}</div>
    </div>
  );
}

function SettingToggle({ reference, setting, toggleFn }: SettingToggleProps) {
  function handleOnChange() {
    toggleFn(setting);
  }

  return (
    <input
      type='checkbox'
      className='settingToggle toggle toggle-lg rounded bg-gray-300 w-10'
      checked={reference}
      onChange={handleOnChange}
    />
  );
}

function SearchSetting() {
  /* tbd */
}
