"use client";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
    FileBarChart,
    Package,
    Warehouse,
    Users,
    TrendingUp,
    Download,
} from "lucide-react";

import Button from "../../components/ui/Button";

export default function ReportsPage() {

    return (

        <div className="flex min-h-screen bg-[#09090B] text-white">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <div className="flex items-center justify-between mb-10">

                        <div>

                            <h1 className="text-5xl font-black">

                                Reports

                            </h1>

                            <p className="mt-3 text-zinc-400">

                                Business analytics and inventory reports.

                            </p>

                        </div>

                        <Button>

                            <Download size={18} />

                            <span className="ml-2">

                                Export PDF

                            </span>

                        </Button>

                    </div>

                    {/* Cards */}

                    <div className="grid gap-6 lg:grid-cols-4">

                        <div className="rounded-3xl bg-[#18181B] border border-zinc-800 p-7">

                            <Package
                                size={30}
                                className="mb-5"
                            />

                            <p className="text-zinc-500">

                                Products

                            </p>

                            <h2 className="mt-3 text-5xl font-black">

                                250

                            </h2>

                        </div>

                        <div className="rounded-3xl bg-[#18181B] border border-zinc-800 p-7">

                            <Warehouse
                                size={30}
                                className="mb-5"
                            />

                            <p className="text-zinc-500">

                                Warehouses

                            </p>

                            <h2 className="mt-3 text-5xl font-black">

                                8

                            </h2>

                        </div>

                        <div className="rounded-3xl bg-[#18181B] border border-zinc-800 p-7">

                            <Users
                                size={30}
                                className="mb-5"
                            />

                            <p className="text-zinc-500">

                                Suppliers

                            </p>

                            <h2 className="mt-3 text-5xl font-black">

                                31

                            </h2>

                        </div>

                        <div className="rounded-3xl bg-[#18181B] border border-zinc-800 p-7">

                            <TrendingUp
                                size={30}
                                className="mb-5"
                            />

                            <p className="text-zinc-500">

                                Revenue

                            </p>

                            <h2 className="mt-3 text-5xl font-black">

                                ₹18.4L

                            </h2>

                        </div>

                    </div>
                    {/* Report Panels */}

                    <div className="mt-10 grid gap-6 lg:grid-cols-2">

                        {/* Inventory Report */}

                        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                            <div className="flex items-center gap-4">

                                <FileBarChart size={28} />

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        Inventory Report

                                    </h2>

                                    <p className="text-zinc-500 mt-1">

                                        Current warehouse stock overview

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8 space-y-6">

                                <div className="flex justify-between">

                                    <span>Total Inventory</span>

                                    <span className="font-bold">

                                        14,280 Units

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Low Stock Items</span>

                                    <span className="font-bold text-yellow-400">

                                        18

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Out of Stock</span>

                                    <span className="font-bold text-red-400">

                                        4

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Total Inventory Value</span>

                                    <span className="font-bold text-green-400">

                                        ₹24,80,000

                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Warehouse Report */}

                        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                            <div className="flex items-center gap-4">

                                <Warehouse size={28} />

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        Warehouse Report

                                    </h2>

                                    <p className="text-zinc-500 mt-1">

                                        Distribution overview

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8 space-y-6">

                                <div className="flex justify-between">

                                    <span>Active Warehouses</span>

                                    <span className="font-bold">

                                        8

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Average Capacity</span>

                                    <span className="font-bold">

                                        78%

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Occupied Space</span>

                                    <span className="font-bold">

                                        14,200 sq.ft

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Available Space</span>

                                    <span className="font-bold text-green-400">

                                        4,300 sq.ft

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Performance */}

                    <div className="mt-10 rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                        <h2 className="text-2xl font-bold">

                            Monthly Performance

                        </h2>

                        <p className="mt-2 text-zinc-500">

                            Business overview for the current month.

                        </p>

                        <div className="mt-10 grid gap-6 md:grid-cols-3">

                            <div className="rounded-2xl bg-zinc-900 p-6">

                                <p className="text-zinc-500">

                                    Sales Growth

                                </p>

                                <h3 className="mt-3 text-4xl font-black text-green-400">

                                    +18%

                                </h3>

                            </div>

                            <div className="rounded-2xl bg-zinc-900 p-6">

                                <p className="text-zinc-500">

                                    Purchase Orders

                                </p>

                                <h3 className="mt-3 text-4xl font-black">

                                    124

                                </h3>

                            </div>

                            <div className="rounded-2xl bg-zinc-900 p-6">

                                <p className="text-zinc-500">

                                    Inventory Accuracy

                                </p>

                                <h3 className="mt-3 text-4xl font-black">

                                    99.2%

                                </h3>

                            </div>

                        </div>

                    </div>
                    {/* Quick Reports */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold mb-6">

                            Available Reports

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7 transition hover:border-white">

                                <Package size={28} />

                                <h3 className="mt-5 text-xl font-bold">

                                    Product Report

                                </h3>

                                <p className="mt-3 text-zinc-500">

                                    Product-wise inventory summary.

                                </p>

                                <Button className="mt-6 w-full">

                                    Download

                                </Button>

                            </div>

                            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7 transition hover:border-white">

                                <Warehouse size={28} />

                                <h3 className="mt-5 text-xl font-bold">

                                    Warehouse Report

                                </h3>

                                <p className="mt-3 text-zinc-500">

                                    Stock by warehouse.

                                </p>

                                <Button className="mt-6 w-full">

                                    Download

                                </Button>

                            </div>

                            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7 transition hover:border-white">

                                <Users size={28} />

                                <h3 className="mt-5 text-xl font-bold">

                                    Supplier Report

                                </h3>

                                <p className="mt-3 text-zinc-500">

                                    Supplier performance details.

                                </p>

                                <Button className="mt-6 w-full">

                                    Download

                                </Button>

                            </div>

                            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7 transition hover:border-white">

                                <TrendingUp size={28} />

                                <h3 className="mt-5 text-xl font-bold">

                                    Revenue Report

                                </h3>

                                <p className="mt-3 text-zinc-500">

                                    Monthly revenue analytics.

                                </p>

                                <Button className="mt-6 w-full">

                                    Download

                                </Button>

                            </div>

                        </div>

                    </div>

                </main>

                <footer className="border-t border-zinc-800 px-8 py-6">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        <div>

                            <h3 className="font-semibold">

                                AIVA Inventory Reports

                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">

                                Inventory Analytics & Reporting Dashboard

                            </p>

                        </div>

                        <div className="flex gap-8 text-sm text-zinc-500">

                            <span>Version 1.0</span>

                            <span>Generated Live</span>

                            <span className="text-green-400">

                                ● Connected

                            </span>

                        </div>

                    </div>

                </footer>

            </div>

        </div>

    );

}