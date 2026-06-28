"use client";

import { useEffect, useMemo, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";

import {
  Package,
  Search,
  Plus,
  Warehouse,
} from "lucide-react";

import { getInventory } from "../services/inventory";

interface InventoryItem {

  id: number;

  quantity: number;

  minimum_stock: number;

  maximum_stock: number;

  product: {

    id: number;

    name: string;

    sku: string;

    category: string;

    price: number;

  };

  warehouse: {

    id: number;

    name: string;

    code: string;

  };

}

export default function InventoryPage() {

  const [loading, setLoading] =
    useState(true);

  const [inventory, setInventory] =
    useState<InventoryItem[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    async function loadInventory() {

      try {

        const data =
          await getInventory();

        setInventory(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadInventory();

  }, []);

  const filteredInventory =
    useMemo(() => {

      return inventory.filter((item) =>

        item.product.name
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.product.sku
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.warehouse.name
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    }, [inventory, search]);

  return (

    <div className="flex min-h-screen bg-[#09090B] text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          {/* Header */}

          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">

            <div>

              <h1 className="text-5xl font-black">

                Inventory

              </h1>

              <p className="mt-3 text-zinc-400">

                Manage warehouse inventory and stock levels.

              </p>

            </div>

            <Button>

              <Plus size={18} />

              <span className="ml-2">

                Add Inventory

              </span>

            </Button>

          </div>

          {/* Search */}

          <div className="relative mb-10">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input

              placeholder="Search inventory..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="pl-12"

            />

          </div>
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#18181B] shadow-xl">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-zinc-900">

                  <tr>

                    <th className="px-6 py-5 text-left">Product</th>

                    <th className="px-6 py-5 text-left">Warehouse</th>

                    <th className="px-6 py-5 text-left">Quantity</th>

                    <th className="px-6 py-5 text-left">Stock Level</th>

                    <th className="px-6 py-5 text-left">Price</th>

                    <th className="px-6 py-5 text-center">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    [...Array(6)].map((_, index) => (

                      <tr
                        key={index}
                        className="border-t border-zinc-800"
                      >

                        <td
                          colSpan={6}
                          className="px-6 py-5"
                        >

                          <Skeleton className="h-14 rounded-xl" />

                        </td>

                      </tr>

                    ))

                  ) : filteredInventory.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="py-20 text-center"
                      >

                        <Package
                          size={60}
                          className="mx-auto text-zinc-700"
                        />

                        <p className="mt-4 text-zinc-500">

                          No Inventory Found

                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredInventory.map((item) => {

                      const percentage = Math.min(
                        (item.quantity / item.maximum_stock) * 100,
                        100
                      );

                      return (

                        <tr
                          key={item.id}
                          className="border-t border-zinc-800 hover:bg-zinc-900 transition"
                        >

                          {/* Product */}

                          <td className="px-6 py-5">

                            <div>

                              <h3 className="font-semibold">

                                {item.product.name}

                              </h3>

                              <p className="mt-1 text-sm text-zinc-500">

                                {item.product.sku}

                              </p>

                              <span className="mt-2 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs">

                                {item.product.category}

                              </span>

                            </div>

                          </td>

                          {/* Warehouse */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <Warehouse
                                size={18}
                                className="text-zinc-500"
                              />

                              <div>

                                <p className="font-medium">

                                  {item.warehouse.name}

                                </p>

                                <p className="text-xs text-zinc-500">

                                  {item.warehouse.code}

                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Quantity */}

                          <td className="px-6 py-5">

                            <span className="text-2xl font-bold">

                              {item.quantity}

                            </span>

                          </td>

                          {/* Stock Progress */}

                          <td className="px-6 py-5">

                            <div className="w-52">

                              <div className="h-3 rounded-full bg-zinc-800">

                                <div
                                  className="h-3 rounded-full bg-white transition-all duration-700"
                                  style={{
                                    width: `${percentage}%`,
                                  }}
                                />

                              </div>

                              <div className="mt-2 flex justify-between text-xs text-zinc-500">

                                <span>

                                  Min {item.minimum_stock}

                                </span>

                                <span>

                                  Max {item.maximum_stock}

                                </span>

                              </div>

                            </div>

                          </td>

                          {/* Price */}

                          <td className="px-6 py-5 font-bold">

                            ₹{item.product.price.toLocaleString()}

                          </td>

                          {/* Status */}

                          {/* Status */}

<td className="px-6 py-5 text-center">

  {item.quantity <= 0 ? (

    <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400">
      Out of Stock
    </span>

  ) : item.quantity <= item.minimum_stock ? (

    <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400">
      Low Stock
    </span>

  ) : (

    <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
      Healthy
    </span>

  )}

</td>

                        </tr>

                      );

                    })

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Summary */}

          {!loading && (

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Total Inventory

                </h3>

                <p className="mt-5 text-5xl font-black">

                  {inventory.length}

                </p>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Low Stock Items

                </h3>

                <p className="mt-5 text-5xl font-black text-yellow-400">

                  {

                    inventory.filter(

                      (i) =>

                        i.quantity <= i.minimum_stock

                        &&

                        i.quantity > 0

                    ).length

                  }

                </p>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Inventory Value

                </h3>

                <p className="mt-5 text-4xl font-black">

                  ₹{

                    inventory

                      .reduce(

                        (sum, item) =>

                          sum +

                          item.quantity *

                          item.product.price,

                        0

                      )

                      .toLocaleString()

                  }

                </p>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );

}