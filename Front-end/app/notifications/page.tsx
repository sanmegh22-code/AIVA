"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Package,
  Clock,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    message: "Rice stock has fallen below the minimum threshold.",
    time: "5 mins ago",
    type: "warning",
    read: false,
  },
  {
    id: 2,
    title: "New Supplier Added",
    message: "ABC Suppliers has been successfully added.",
    time: "20 mins ago",
    type: "success",
    read: true,
  },
  {
    id: 3,
    title: "Inventory Updated",
    message: "Warehouse A inventory has been synchronized.",
    time: "1 hour ago",
    type: "info",
    read: false,
  },
  {
    id: 4,
    title: "Stock Transfer Completed",
    message: "Transfer from Warehouse B to A completed.",
    time: "Today",
    type: "success",
    read: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = notifications.filter((item) =>
    filter === "all" ? true : !item.read
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="text-yellow-400" size={22} />;
      case "success":
        return <CheckCircle className="text-green-400" size={22} />;
      default:
        return <Package className="text-blue-400" size={22} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Notifications
              </h1>

              <p className="mt-2 text-zinc-500">
                Stay updated with inventory activities.
              </p>
            </div>

            <Bell size={34} className="text-white" />
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-xl px-5 py-2 ${
                filter === "all"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`rounded-xl px-5 py-2 ${
                filter === "unread"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-white"
              }`}
            >
              Unread
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {getIcon(item.type)}

                    <div>
                      <h2 className="font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-zinc-400">
                        {item.message}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                        <Clock size={14} />
                        {item.time}
                      </div>
                    </div>
                  </div>

                  {!item.read && (
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                      New
                    </span>
                  )}
                </div>

                <button className="mt-6 rounded-xl bg-white px-5 py-2 font-medium text-black hover:bg-zinc-200">
                  Mark as Read
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-10 text-center">
              <Bell className="mx-auto mb-4 text-zinc-500" size={40} />
              <h2 className="text-xl font-semibold text-white">
                No Notifications
              </h2>
              <p className="mt-2 text-zinc-500">
                You're all caught up.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}