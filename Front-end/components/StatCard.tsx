"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7 shadow-xl"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">

            {title}

          </p>

          <h2 className="mt-4 text-5xl font-black text-white">

            {value}

          </h2>

          <p className="mt-4 text-sm text-green-400">

            {change}

          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700 text-white">

          {icon}

        </div>

      </div>
    </motion.div>
  );
}