"use client";

import { HeroPattern } from "@/components/HeroPattern";
import { Button } from "@headlessui/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroPattern />
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <Button className="bg-primary p-2 rounded-lg">Primary color</Button>
      </div>
    </>
  );
}
