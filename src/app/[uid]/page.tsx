// app/[uid]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

// We no longer import Header here; it is rendered once in app/layout.tsx

type Props = {
  params: Promise<{
    uid: string;
  }>;
};

export default async function Page({ params }: Props) {
  // Wait for params to resolve before using
  const { uid } = await params;
  const client = createClient();

  // If the UID isn’t found, throw a 404
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return (
    <main className="prose mx-auto py-16">
      <h1>{page.data.meta_title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((p) => ({ uid: p.uid! }));
}
