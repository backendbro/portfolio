"use client";

import { useEffect } from "react";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { gsap } from "gsap";
import { useRef } from "react";

type AvatarProps = {
  image: ImageField;
  className?: string;
  alt?: string;
};

export default function Avatar({ image, className, alt }: AvatarProps) {
  const imgAlt = alt ?? image.alt ?? "An image";
  const component = useRef(null);

  useEffect(() => {
    gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.inOut",
        }
      );

      window.onmousemove = (e) => {
        if (!component.current) return; // no component, no animation!
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        const componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };

        const distFromCenterX = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenterX - 0.7,
              x: -10 + 20 * componentPercent.x,
              duration: 0.5,
            },
            0
          );
      };
    });
  });

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div
        className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700"
        style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
      >
        <PrismicNextImage
          field={image}
          className="w-full avatar-image"
          imgixParams={{ q: 90 }}
          alt={imgAlt as ""}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>{" "}
      </div>
    </div>
  );
}
