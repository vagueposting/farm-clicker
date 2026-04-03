interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col items-center justify-center'>
        {/* Page content here */}
        <label
          htmlFor='sidebar'
          className='btn drawer-button lg:hidden bg-gray-100 border-0 absolute top-0 left-0 m-4 w-8 h-8 shadow-md'
        >
          <span className='material-icons-round scale-200'>arrow_right</span>
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='sidebar'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='bg-gray-200 min-h-full w-64 p-4'>
          {/* Sidebar content here */}
          {children}
        </div>
      </div>
    </div>
  );
}
