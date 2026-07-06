"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-8"
          >
            <div className="flex justify-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">

                <AlertTriangle
                  size={32}
                  className="text-red-600"
                />

              </div>

            </div>

            <h2 className="mt-6 text-center text-2xl font-bold">
              {title}
            </h2>

            <p className="mt-3 text-center text-zinc-500">
              {description}
            </p>

            <div className="mt-8 flex gap-4">

              <button
                disabled={loading}
                onClick={onCancel}
                className="flex-1 rounded-2xl border border-zinc-300 dark:border-zinc-700 py-3 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                {cancelText}
              </button>

              <button
                disabled={loading}
                onClick={onConfirm}
                className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
              >
                {loading ? "Please wait..." : confirmText}
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}