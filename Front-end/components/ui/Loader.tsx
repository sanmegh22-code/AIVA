"use client";

import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2
        className="animate-spin"
        size={36}
      />
    </div>
  );
}