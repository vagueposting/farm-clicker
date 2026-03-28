interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className='h-screen grid-cols-5 grid-rows-5'>{children}</div>;
}
