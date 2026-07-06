"use client";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import Button from "../../components/ui/Button";

import {
    User,
    Shield,
    Bell,
    Database,
    Save,
} from "lucide-react";

export default function SettingsPage() {

    return (

        <div className="flex min-h-screen bg-[#09090B] text-white">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <div className="mb-10">

                        <h1 className="text-5xl font-black">

                            Settings

                        </h1>

                        <p className="mt-3 text-zinc-400">

                            Manage your account and system preferences.

                        </p>

                    </div>

                    <div className="grid gap-8 xl:grid-cols-3">

                        {/* Profile */}

                        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                            <div className="flex items-center gap-5">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-black text-3xl font-black">

                                    S

                                </div>

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        Sanmegh

                                    </h2>

                                    <p className="text-zinc-500">

                                        Administrator

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8 space-y-5">

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Full Name

                                    </label>

                                    <input
                                        defaultValue="Sanmegh"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Email

                                    </label>

                                    <input
                                        defaultValue="admin@aiva.com"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* System */}

                        <div className="xl:col-span-2 rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                            <div className="flex items-center gap-4">

                                <Database size={28} />

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        Inventory Settings

                                    </h2>

                                    <p className="text-zinc-500">

                                        Default inventory configuration

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8 grid gap-6 md:grid-cols-2">

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Low Stock Alert

                                    </label>

                                    <input
                                        defaultValue="10"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Maximum Stock

                                    </label>

                                    <input
                                        defaultValue="1000"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>
                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Default Currency

                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">

                                        <option>INR (₹)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>

                                    </select>

                                </div>

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Time Zone

                                    </label>

                                    <select className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">

                                        <option>Asia/Kolkata</option>

                                    </select>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Security & Notifications */}

                    <div className="mt-8 grid gap-8 lg:grid-cols-2">

                        {/* Security */}

                        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                            <div className="flex items-center gap-3 mb-8">

                                <Shield size={26} />

                                <h2 className="text-2xl font-bold">

                                    Security

                                </h2>

                            </div>

                            <div className="space-y-6">

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Current Password

                                    </label>

                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        New Password

                                    </label>

                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm text-zinc-500">

                                        Confirm Password

                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Notifications */}

                        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

                            <div className="flex items-center gap-3 mb-8">

                                <Bell size={26} />

                                <h2 className="text-2xl font-bold">

                                    Notifications

                                </h2>

                            </div>

                            <div className="space-y-6">

                                <label className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5">

                                    <span>Email Notifications</span>

                                    <input type="checkbox" defaultChecked />

                                </label>

                                <label className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5">

                                    <span>Low Stock Alerts</span>

                                    <input type="checkbox" defaultChecked />

                                </label>

                                <label className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5">

                                    <span>System Updates</span>

                                    <input type="checkbox" defaultChecked />

                                </label>

                            </div>

                        </div>

                    </div>

                    {/* Save Button */}

                    <div className="mt-10 flex justify-end">

                        <Button>

                            <Save size={18} />

                            <span className="ml-2">

                                Save Settings

                            </span>

                        </Button>

                    </div>

                </main>

                <footer className="border-t border-zinc-800 px-8 py-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="font-semibold">

                                AIVA Inventory Management

                            </h3>

                            <p className="text-sm text-zinc-500 mt-1">

                                Settings & Preferences

                            </p>

                        </div>

                        <span className="text-sm text-zinc-500">

                            Version 1.0

                        </span>

                    </div>

                </footer>

            </div>

        </div>

    );

}