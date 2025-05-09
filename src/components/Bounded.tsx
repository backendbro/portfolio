import React from "react";
import clsx from "clsx";

type AsProp<C extends React.ElementType> = {
  /** The element or component to render as */
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Build the props for a polymorphic component:
 *  - Your own props (P) plus `as`, plus
 *  - all props of C, *except* the ones you’re overriding (`as`, `children`, etc.)
 */
type PolymorphicProps<C extends React.ElementType, P> = React.PropsWithChildren<
  P & AsProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, P>>;

type BoundedOwnProps = {
  className?: string;
};

/**
 * Our final props:
 *  - can pass `as="a"` or `as={MyComponent}`
 *  - can pass `className`
 *  - will get full intrinsic props of the chosen `as` *minus* `as`/`children`
 *  - children is exactly ReactNode
 */
type BoundedProps<C extends React.ElementType = "section"> = PolymorphicProps<
  C,
  BoundedOwnProps
>;

const Bounded = React.forwardRef(
  <C extends React.ElementType = "section">(
    props: BoundedProps<C>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.Ref<any>
  ) => {
    const { as, className, children, ...restProps } = props;

    const Comp = as ?? "section";

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
);

Bounded.displayName = "Bounded";

export default Bounded;
