"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Content, KeyTextField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl">
        <div className="flex items-center justify-between">
          <NameLogo name={settings.data.name} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>

        <div
          className={clsx(
            "fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-all duration-500 ease-out md:hidden",
            open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>

          {settings.data.nav_item.map(({ link, label }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <PrismicNextLink
                  className="group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900"
                  field={link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full translate-y-12 rounded bg-gradient-to-r from-slate-300 to-slate-400 transition-transform duration-500 ease-in-out group-hover:translate-y-0",
                      pathname.includes(asLink(link) as string)
                        ? "translate-y-0"
                        : "translate-y-12"
                    )}
                  />
                  <span className="relative mix-blend-overlay transition-all duration-300 group-hover:mix-blend-normal">
                    {label}
                  </span>
                </PrismicNextLink>
              </li>

              {index < settings.data.nav_item.length - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}

          <li>
            <Button
              linkField={settings.data.cta_link}
              label={settings.data.cta_label}
              className="ml-3 bg-gradient-to-r from-slate-300 to-slate-400 hover:from-cyan-300 hover:to-blue-400"
            />
          </li>
        </div>

        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-slate-900 transition-all hover:scale-105 hover:text-slate-600"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {settings.data.nav_item.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <PrismicNextLink
              className="group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900"
              field={link}
              aria-current={
                pathname.includes(asLink(link) as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 transition-transform duration-500 ease-in-out",
                  pathname.includes(asLink(link) as string)
                    ? "translate-y-0"
                    : "-translate-y-full group-hover:translate-y-0"
                )}
              />
              <span className="relative mix-blend-overlay transition-all duration-300 group-hover:mix-blend-normal">
                {label}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-400 transition-all duration-500 group-hover:w-full" />
            </PrismicNextLink>
          </li>

          {index < settings.data.nav_item.length - 1 && (
            <span
              className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}

      <li>
        <Button
          linkField={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3 bg-gradient-to-r from-slate-300 to-slate-400 hover:from-cyan-300 hover:to-blue-400"
        />
      </li>
    </div>
  );
}
