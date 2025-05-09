import React from "react";
import clsx from "clsx";

type BoundedProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

const Bounded = React.forwardRef(
  <T extends React.ElementType = "section">(
    {
      as: Comp = "section",
      className,
      children,
      ...restProps
    }: BoundedProps<T>,
    ref: React.ForwardedRef<React.ComponentRef<T>>
  ) => {
    return (
      <Comp
        ref={ref}
        className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  }
) as <T extends React.ElementType = "section">(
  props: BoundedProps<T> & { ref?: React.ForwardedRef<React.ComponentRef<T>> }
) => React.ReactElement;

Bounded.displayName = "Bounded";

export default Bounded;
