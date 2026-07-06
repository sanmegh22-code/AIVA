"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between mb-6"
    >
      <div>
        <h2 className="text-3xl font-bold">
          {title}
        </h2>

        {subtitle && (
          <p className="text-zinc-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </motion.div>
  );
}
