"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowProfileMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const notifications = [
    { title: "Low stock alert", detail: "3 products need replenishment." },
    { title: "Inventory updated", detail: "Warehouse B stock synced successfully." },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090B]/95 backdrop-blur">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold text-white">AIVA Inventory</h1>
          <p className="mt-1 text-sm text-zinc-500">Inventory Management System</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications((value) => !value);
                setShowProfileMenu(false);
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 transition hover:border-white"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-80 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
                <div className="mb-2 px-2 text-sm font-semibold text-white">Notifications</div>
                <div className="space-y-2">
                  {notifications.map((item, index) => (
                    <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-500">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((value) => !value);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2 transition hover:border-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                <User size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Sanmegh</p>
                <p className="text-xs text-zinc-500">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-zinc-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-56 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                  <p className="font-semibold text-white">Sanmegh</p>
                  <p className="text-sm text-zinc-500">Administrator</p>
                </div>
                <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white">
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-400 transition hover:bg-zinc-900 hover:text-red-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}