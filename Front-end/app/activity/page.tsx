"use client";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  History,
  Package,
  Truck,
  User,
  Clock,
  Search,
} from "lucide-react";

const activities = [
  {
    id: 1,
    action: "Product Added",
    user: "Admin",
    description: "Added Premium Rice to inventory.",
    time: "5 mins ago",
    icon: Package,
  },
  {
    id: 2,
    action: "Supplier Updated",
    user: "Admin",
    description: "Updated ABC Suppliers contact details.",
    time: "30 mins ago",
    icon: Truck,
  },
  {
    id: 3,
    action: "Stock Adjusted",
    user: "Warehouse Manager",
    description: "Reduced Sugar stock by 20 units.",
    time: "1 hour ago",
    icon: Package,
  },
  {
    id: 4,
    action: "User Login",
    user: "Sanmegh",
    description: "Logged into AIVA dashboard.",
    time: "Today",
    icon: User,
  },
];

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Activity Log
              </h1>

              <p className="mt-2 text-zinc-500">
                View recent system activities and events.
              </p>
            </div>

            <History className="text-white" size={34} />
          </div>

          <div className="relative mt-8">
            <Search
              className="absolute left-4 top-4 text-zinc-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search activity..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none"
            />
          </div>

          <div className="mt-8 space-y-5">
            {activities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-zinc-900 p-3">
                      <Icon className="text-blue-400" size={22} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-white">
                          {item.action}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <Clock size={14} />
                          {item.time}
                        </div>
                      </div>

                      <p className="mt-2 text-zinc-400">
                        {item.description}
                      </p>

                      <p className="mt-3 text-sm text-zinc-500">
                        Performed by <span className="text-white">{item.user}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}