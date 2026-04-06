import { useState } from "react";
import { cn } from "../utils/cn";

interface SidebarProps {
  children: React.ReactNode;
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
    "btn lg:hidden bg-gray-100 border-0 absolute top-4 left-4 w-8 h-8 shadow-md z-50",
    !sidebarState ? "hidden" : "",
  );

  return (
    <>
      <label
        htmlFor='sidebar'
        className={hamburgerClass}
        onClick={handleSidebarButton}
      >
        <span className='material-icons-round'>menu</span>
      </label>

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

      <div className='fixed lg:static inset-y-0 left-0 w-64 bg-gray-200 p-4 pt-8 transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform z-40 lg:z-0'>
        <label
          htmlFor='sidebar'
          className='btn lg:hidden bg-gray-100 border-0 mb-4 w-8 h-8 shadow-md self-end justify-self-end absolute top-6 right-0 mr-4 z-10'
          onClick={handleSidebarButton}
        >
          <span className='material-icons-round'>close</span>
        </label>
        {children}
      </div>
    </>
  );
}
