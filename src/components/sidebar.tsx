import { useState } from "react";
import { cn } from "../utils/cn";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarControlProps {
  icon: string;
  clickFn: () => void;
  color?: {
    button: string;
    icon: string;
  };
  extraClasses?: string;
}

export function Sidebar({ children }: SidebarProps) {
  const [sidebarState, changeSidebarState] = useState(true);

  function handleSidebarButton() {
    if (!sidebarState) {
      changeSidebarState(true);
    } else {
      changeSidebarState(false);
    }
  }

  return (
    <>
      <SidebarControls
        icon='menu'
        extraClasses={`lg:hidden absolute top-4 ml-4 z-10 ${!sidebarState ? "hidden" : ""}`}
        clickFn={handleSidebarButton}
        asLabel={true}
      />

      <input
        id='sidebar'
        type='checkbox'
        className='drawer-toggle peer hidden'
      />

      <label
        htmlFor='sidebar'
        className='fixed inset-0 z-30 lg:hidden peer-checked:block hidden'
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleSidebarButton}
      ></label>

      <div className='fixed lg:static inset-y-0 left-0 w-64 bg-gray-200 p-4 pt-8 transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform z-30 lg:z-0'>
        <SidebarControls
          icon='close'
          clickFn={handleSidebarButton}
          extraClasses='lg:hidden absolute top-4 right-0 mr-4 z-10'
          asLabel={true}
        />
        <div className='relative xl:-top-2 lg:top-1 md:top-6 sm:top-7 flex flex-col justify-between h-full'>
          <div>{children}</div>
          <div>
            <div className='divider bg-black h-px mb-0'></div>
            <SidebarControls
              icon='settings'
              clickFn={() =>
                // @ts-ignore
                document.getElementById("settings").showModal()
              }
              extraClasses='relative mt-2 rounded'
              color={{
                icon: "white",
                button: "gray-400",
              }}
              asLabel={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarControls({
  icon,
  clickFn,
  color = {
    icon: "white",
    button: "sky-400",
  },
  extraClasses,
  asLabel = false,
}: SidebarControlProps & { asLabel?: boolean }) {
  const iconClassList = cn("material-icons-round", `text-${color.icon}`);
  const buttonClassList = cn(
    "btn rounded-full border-0 mb-4 w-8 h-8 shadow-md self-end justify-self-end",
    `bg-${color.button}`,
    extraClasses,
  );

  if (asLabel) {
    return (
      <label htmlFor='sidebar' className={buttonClassList} onClick={clickFn}>
        <span className={iconClassList}>{icon}</span>
      </label>
    );
  }

  return (
    <button className={buttonClassList} onClick={clickFn}>
      <span className={iconClassList}>{icon}</span>
    </button>
  );
}
