"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-[#09090B] transition-colors duration-300">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar />

        <motion.main
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="flex-1 overflow-y-auto p-8"
        >
          {children}
        </motion.main>

      </div>

    </div>
  );
}