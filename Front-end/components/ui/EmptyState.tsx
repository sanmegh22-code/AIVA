"use client";

import { PackageOpen } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6">

        <PackageOpen size={38} />

      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-zinc-500 mt-2 text-center max-w-md">
        {description}
      </p>

    </div>
  );
}