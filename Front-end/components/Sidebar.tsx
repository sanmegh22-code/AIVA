"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Boxes,
  Package,
  Truck,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Truck,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-zinc-800 bg-black">

      {/* Logo */}

      <div className="border-b border-zinc-800 px-8 py-8">

        <h1 className="text-4xl font-black tracking-wider text-white">

          AIVA

        </h1>

        <p className="mt-2 text-sm text-zinc-500">

          Inventory Management

        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-6">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.title}
              href={item.href}
            >

              <div
                className={`mb-3 flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200

                ${
                  active
                    ? "bg-white text-black shadow-xl"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
                `}
              >

                <Icon size={22} />

                <span className="font-medium">

                  {item.title}

                </span>

              </div>

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl bg-zinc-900 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black text-lg font-bold">

              S

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

    </aside>
  );
}