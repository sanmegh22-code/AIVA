"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Search, Package, Truck, Warehouse } from "lucide-react";

const data = [
  {
    id: 1,
    type: "Product",
    title: "Premium Rice",
    subtitle: "Stock: 120 Units",
    icon: Package,
  },
  {
    id: 2,
    type: "Supplier",
    title: "ABC Suppliers",
    subtitle: "Mumbai",
    icon: Truck,
  },
  {
    id: 3,
    type: "Warehouse",
    title: "Warehouse A",
    subtitle: "250 Products",
    icon: Warehouse,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filtered = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold text-white">
            Global Search
          </h1>

          <p className="mt-2 text-zinc-500">
            Search products, suppliers and warehouses.
          </p>

          <div className="relative mt-8">
            <Search
              className="absolute left-4 top-4 text-zinc-500"
              size={20}
            />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none"
            />
          </div>

          <div className="mt-8 space-y-5">
            {filtered.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-zinc-900 p-3">
                      <Icon className="text-blue-400" size={22} />
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">{item.type}</p>

                      <h2 className="text-lg font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="text-zinc-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center">
                <Search
                  className="mx-auto mb-4 text-zinc-500"
                  size={40}
                />

                <h2 className="text-xl font-semibold text-white">
                  No Results Found
                </h2>

                <p className="mt-2 text-zinc-500">
                  Try searching with another keyword.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}