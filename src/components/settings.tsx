// @ts-ignore
import "./settings.css";
import { useStatModalStore } from "../stores/player-info-modal";
import { generateSettingList } from "../data/settingsList";

interface SettingToggleProps {
  reference: boolean;
  settingParam: string;
  toggleFn: (setting: any) => void;
}

interface SettingStringProps {
  reference: string;
  toggleFn: (setting: string) => void;
}

export interface SettingConfig {
  title: string;
  description?: React.ReactNode;
  category?: string;
  setting: SettingToggleProps | SettingStringProps;
}

type SettingProps = Omit<SettingConfig, "setting"> & {
  children: React.ReactNode;
};

export function SettingsMenu() {
  const settingsOrder = ["Appearance"];
  const settingList = generateSettingList();

  return (
    <dialog id='settings' className='modal z-20'>
      <div className='modal-box flex flex-col bg-white rounded shadow-lg gap-2'>
        <h2 className='font-bold text-2xl mb-2'>Settings</h2>
        <div className='divider bg-black h-px -mt-2 -mb-1'></div>
        <div
          id='allSetting'
          className='flex flex-col gap-3 h-80 overflow-y-auto'
        >
          <h3 className='font-bold text-lg'>Appearance</h3>
        </div>

        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn bg-gray-300 border-0 rounded h-auto py-1'>
              Close
            </button>
          </form>
        </div>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}

function Setting({ title, description, children, category }: SettingProps) {
  return (
    <div className='grid grid-cols-5'>
      <div className='flex flex-col col-start-1 col-end-5'>
        <div className='font-bold text-sm'>{title}</div>
        <div className='text-xs'>{description}</div>
      </div>
      <div className='col-start-5 col-end-6 justify-self-center self-center'>
        {children}
      </div>
    </div>
  );
}

function SettingToggle({
  reference,
  settingParam,
  toggleFn,
}: SettingToggleProps) {
  function handleOnChange() {
    toggleFn(settingParam);
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
  // TODO: create visual component?
}
