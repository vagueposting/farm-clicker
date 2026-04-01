interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col items-center justify-center'>
        {/* Page content here */}
        <label htmlFor='my-drawer-3' className='btn drawer-button lg:hidden'>
          Open drawer
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='bg-gray-200 min-h-full w-64 p-4'>
          {/* Sidebar content here */}
          <p>Test</p>
        </div>
      </div>
    </div>
  );
}
