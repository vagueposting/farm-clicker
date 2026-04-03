import { forwardRef } from "react";
import { cn } from "../utils/cn";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children }, ref) => {
    const classList = cn("h-screen w-screen flex flex-row relative");
    return (
      <div ref={ref} className={classList}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export { Container };
