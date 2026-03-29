import { cn } from "../utils/cn";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const classList = cn("h-screen grid grid-cols-5 grid-rows-5");
  return <div className={classList}>{children}</div>;
}
