import { useState } from "react";
import { cn } from "../utils/cn";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarControlProps {
  icon: string;
  clickFn: () => void;
  color?: string;
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

  const hamburgerClass = cn(
    "btn lg:hidden bg-sky-400 border-0 absolute top-4 left-4 w-8 h-8 shadow-sm z-50 rounded-full",
  );

  return (
    <>
      <SidebarControls
        icon='menu'
        extraClasses={!sidebarState ? "hidden" : ""}
        clickFn={handleSidebarButton}
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
        <SidebarControls icon='close' clickFn={handleSidebarButton} />
        <div className='relative xl:-top-2 lg:top-1 md:top-6 sm:top-7 flex flex-col justify-between h-full'>
          <div>{children}</div>
          <div>
            <div className='divider bg-black h-px mb-0'></div>
            <p>Test</p>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarControls({
  icon,
  clickFn,
  color = "sky-400",
  extraClasses,
}: SidebarControlProps) {
  const iconClassList = cn("material-icons-round text-white", extraClasses);
  const buttonClassList = cn(
    "btn lg:hidden rounded-full border-0 mb-4 w-8 h-8 shadow-md self-end justify-self-end absolute top-4 right-0 mr-4 z-10",
    `bg-${color}`,
  );

  return (
    <label htmlFor='sidebar' className={buttonClassList} onClick={clickFn}>
      <span className={iconClassList}>{icon}</span>
    </label>
  );
}
