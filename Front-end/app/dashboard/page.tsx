"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import StatCard from "../../components/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";

import {
  Package,
  Boxes,
  Warehouse,
  TriangleAlert,
  Plus,
  FileText,
} from "lucide-react";

import {
  getDashboardSummary,
  getRecentMovements,
} from "../services/dashboard";

interface MovementItem {
  id: number;
  movement_type: string;
  quantity: number;
  reference?: string | null;
}

export default function DashboardPage() {

  const [loading, setLoading] =
    useState(true);

  const [summary, setSummary] =
    useState({
      total_products: 0,
      total_categories: 0,
      total_warehouses: 0,
      total_inventory: 0,
      low_stock: 0,
    });

  const [movements, setMovements] =
    useState<MovementItem[]>([]);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const dashboard =
          await getDashboardSummary();

        const recent =
          await getRecentMovements();

        setSummary(dashboard);
        setMovements(recent);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, []);

  return (

    <div className="flex min-h-screen bg-[#09090B] text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          {/* Hero */}

          <section className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-black via-zinc-950 to-zinc-900 p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between gap-10">

              <div>

                <h1 className="text-5xl font-black tracking-tight">

                  Welcome Back 👋

                </h1>

                <p className="mt-5 max-w-2xl text-lg text-zinc-400 leading-8">

                  Manage products,
                  suppliers,
                  warehouses and
                  inventory with
                  AIVA Inventory
                  Management.

                </p>

              </div>

              <div className="flex gap-4">

                <Button>

                  <Plus size={18} />

                  <span className="ml-2">

                    Add Product

                  </span>

                </Button>

                <Button variant="secondary">

                  <FileText size={18} />

                  <span className="ml-2">

                    Reports

                  </span>

                </Button>

              </div>

            </div>

          </section>
          {/* Statistics */}

          <div className="mt-10">

            {loading ? (

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <Skeleton className="h-40 rounded-3xl" />
                <Skeleton className="h-40 rounded-3xl" />
                <Skeleton className="h-40 rounded-3xl" />
                <Skeleton className="h-40 rounded-3xl" />

              </div>

            ) : (

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                  title="Products"
                  value={summary.total_products.toString()}
                  change="Live Data"
                  icon={<Package size={24} />}
                />

                <StatCard
                  title="Categories"
                  value={summary.total_categories.toString()}
                  change="Updated"
                  icon={<Boxes size={24} />}
                />

                <StatCard
                  title="Warehouses"
                  value={summary.total_warehouses.toString()}
                  change="Operational"
                  icon={<Warehouse size={24} />}
                />

                <StatCard
                  title="Low Stock"
                  value={summary.low_stock.toString()}
                  change="Needs Attention"
                  icon={<TriangleAlert size={24} />}
                />

              </div>

            )}

          </div>

          {/* Analytics */}

          <div className="mt-10 grid gap-6 lg:grid-cols-3">

            {/* Inventory Health */}

            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

              <h2 className="text-2xl font-bold">

                Inventory Health

              </h2>

              <p className="mt-3 text-zinc-400">

                Current warehouse stock condition.

              </p>

              <div className="mt-8 h-4 rounded-full bg-zinc-800">

                <div className="h-4 w-4/5 rounded-full bg-white transition-all duration-700" />

              </div>

              <div className="mt-5 flex justify-between">

                <span className="text-zinc-500">

                  Healthy Stock

                </span>

                <span className="font-bold">

                  80%

                </span>

              </div>

            </div>

            {/* Inventory Value */}

            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

              <h2 className="text-2xl font-bold">

                Inventory Value

              </h2>

              <p className="mt-3 text-zinc-400">

                Estimated total stock value.

              </p>

              <h1 className="mt-8 text-5xl font-black">

                ₹2.4L

              </h1>

              <p className="mt-4 text-zinc-500">

                Updated automatically

              </p>

            </div>

            {/* Backend */}

            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

              <h2 className="text-2xl font-bold">

                System Status

              </h2>

              <p className="mt-3 text-zinc-400">

                API & Database Monitoring

              </p>

              <div className="mt-8 flex items-center gap-4">

                <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse" />

                <span className="font-semibold text-green-400">

                  Backend Online

                </span>

              </div>

              <p className="mt-6 text-zinc-500">

                All services are responding normally.

              </p>

            </div>

          </div>
          {/* Bottom Section */}

          <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Recent Activity */}

            <div className="xl:col-span-2 rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold">
                    Recent Activity
                  </h2>

                  <p className="mt-2 text-zinc-500">
                    Latest inventory movements
                  </p>

                </div>

                <Button variant="secondary">
                  View All
                </Button>

              </div>

              {movements.length === 0 ? (

                <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-zinc-700">

                  <div className="text-center">

                    <Package
                      size={52}
                      className="mx-auto text-zinc-600"
                    />

                    <p className="mt-5 text-zinc-500">
                      No recent activity found.
                    </p>

                  </div>

                </div>

              ) : (

                <div className="space-y-4">

                  {movements.map((movement) => (

                    <div
                      key={movement.id}
                      className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-white"
                    >

                      <div>

                        <h3 className="font-semibold text-lg">
                          {movement.movement_type}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          {movement.reference || "No Reference"}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-2xl font-bold">
                          {movement.quantity}
                        </p>

                        <p className="text-xs text-zinc-500">
                          Quantity
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* AI Insights */}

            <div className="space-y-6">

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                <h2 className="text-2xl font-bold">
                  Today's Summary
                </h2>

                <div className="mt-8 space-y-5">

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Products</span>
                    <span className="font-bold">{summary.total_products}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Categories</span>
                    <span className="font-bold">{summary.total_categories}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Warehouses</span>
                    <span className="font-bold">{summary.total_warehouses}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Low Stock</span>
                    <span className="font-bold text-red-400">
                      {summary.low_stock}
                    </span>
                  </div>

                </div>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-8">

                <h2 className="text-2xl font-bold">
                  AI Insights
                </h2>

                <p className="mt-6 leading-8 text-zinc-400">

                  Inventory performance is healthy.

                  Products with low stock should
                  be restocked soon.

                  Supplier response time has
                  improved compared to the
                  previous week.

                </p>

              </div>

            </div>

          </div>

        </main>

        {/* Footer */}

        <footer className="border-t border-zinc-800 px-8 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                AIVA Inventory Management
              </h3>

              <p className="text-sm text-zinc-500 mt-1">
                AI Powered Inventory Management System
              </p>

            </div>

            <div className="flex gap-8 text-sm text-zinc-500">

              <span>Version 1.0.0</span>

              <span>API Connected</span>

              <span className="text-green-400">
                ● Online
              </span>

            </div>

          </div>

        </footer>

      </div>

    </div>

  );

}