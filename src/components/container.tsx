import { cn } from "../utils/cn";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const classList = cn("h-screen w-screen grid grid-cols-10 grid-rows-10");
  return <div className={classList}>{children}</div>;
}
