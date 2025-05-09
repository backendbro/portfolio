import React from "react";
import clsx from "clsx";

// 1. Helper types for a polymorphic `ref` and props:
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type BoundedProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "children">;

// 2. The inner component as a generic function:
function BoundedInner<C extends React.ElementType = "section">(
  { as, className, children, ...restProps }: BoundedProps<C>,
  ref: PolymorphicRef<C>
) {
  const Comp = as || "section";
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

// 3. forwardRef + cast to a fully-generic component type:
const Bounded = React.forwardRef(BoundedInner) as <
  C extends React.ElementType = "section",
>(
  props: BoundedProps<C> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null;

Bounded.displayName = "Bounded";
export default Bounded;
