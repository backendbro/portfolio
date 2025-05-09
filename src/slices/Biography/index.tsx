import clsx from "clsx";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>

        <div
          className={clsx(
            "col-start-1",
            // slightly smaller text (14px → 16px at md)
            "text-slate-200 text-base font-medium md:text-base",
            // tighter line-height
            "leading-normal",
            // less space between blocks
            "space-y-4",
            // lists: tighter gap
            "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1",
            "[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1",
            // link styling unchanged
            "[&>a]:underline [&>a]:decoration-slate-400 [&>a]:hover:decoration-slate-200",
            // keep your strong/blockquote tweaks
            "[&>strong]:font-semibold [&>blockquote]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-slate-600 [&>blockquote]:italic"
          )}
        >
          <PrismicRichText field={slice.primary.description} />
        </div>

        <Button
          className="text-slate-900"
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />
        <Avatar
          image={slice.primary.avatar}
          alt="Primary avatar"
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
