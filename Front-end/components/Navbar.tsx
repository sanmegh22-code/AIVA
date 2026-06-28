"use client";

import { Bell, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090B]/95 backdrop-blur">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            AIVA Inventory
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Inventory Management System
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 rounded-2xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-white"
            />

          </div>

          {/* Notification */}

          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 transition hover:border-white">

            <Bell size={20} className="text-white" />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          {/* Profile */}

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">

              <User size={20} />

            </div>

            <div>

              <p className="font-semibold text-white">
                Sanmegh
              </p>

              <p className="text-xs text-zinc-500">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}