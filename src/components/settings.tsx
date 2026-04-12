// @ts-ignore
import "./settings.css";
import { generateSettingList } from "../data/settingsList";

export enum SettingMethods {
  Toggle,
  String,
}
interface SettingToggleProps {
  type?: "toggle";
  reference: boolean;
  settingParam: string;
  toggleFn: (setting: any) => void;
}

interface SettingStringProps {
  type?: "string";
  reference: string;
  changeFn: (setting: string) => void;
}

export type SettingData = SettingToggleProps | SettingStringProps;

export interface SettingConfig {
  title: string;
  description?: React.ReactNode;
  category?: string;
  setting: SettingData;
}

type SettingProps = Omit<SettingConfig, "setting"> & {
  settingNode: React.ReactNode;
};

export function SettingsMenu() {
  const settingsOrder = ["Appearance"];
  const settingList = generateSettingList();

  function isToggleSetting(
    setting: SettingData,
  ): setting is SettingToggleProps {
    return setting.type === "toggle";
  }

  function isStringSetting(
    setting: SettingData,
  ): setting is SettingStringProps {
    return setting.type === "string";
  }

  function renderSettingType(settingData: SettingConfig): React.ReactNode {
    const { setting } = settingData;

    if (isToggleSetting(setting)) {
      return (
        <SettingToggle
          reference={setting.reference}
          settingParam={setting.settingParam}
          toggleFn={setting.toggleFn}
        />
      );
    }

    if (isStringSetting(setting)) {
      /* return (
        <SettingString
          reference={setting.reference}
          changeFn={setting.changeFn}
        />
      ); */
    }

    return null;
  }

  return (
    <dialog id='settings' className='modal z-20'>
      <div className='modal-box flex flex-col bg-white rounded shadow-lg gap-2'>
        <h2 className='font-bold text-2xl mb-2'>Settings</h2>
        <div className='divider bg-black h-px -mt-2 -mb-1'></div>
        <div
          id='allSetting'
          className='flex flex-col gap-3 h-80 overflow-y-auto'
        >
          {settingsOrder.map((cat) => (
            <>
              <h3 className='font-bold text-lg'>{cat}</h3>
              {settingList
                .filter((s: SettingConfig) => s.category === cat)
                .map((s: SettingConfig) => {
                  return (
                    <Setting
                      key={s.title}
                      title={s.title}
                      description={s.description}
                      settingNode={renderSettingType(s)}
                    />
                  );
                })}
            </>
          ))}
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

function Setting({ title, description, settingNode, category }: SettingProps) {
  return (
    <div className='grid grid-cols-5'>
      <div className='flex flex-col col-start-1 col-end-5'>
        <div className='font-bold text-sm'>{title}</div>
        <div className='text-xs'>{description}</div>
      </div>
      <div className='col-start-5 col-end-6 justify-self-center self-center'>
        {settingNode}
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

function SettingString({ reference, changeFn }: SettingStringProps) {
  // TODO: Define function
}

function SearchSetting() {
  // TODO: create visual component?
}
