"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Inventory", href: "/inventory" },
    { name: "Products", href: "/products" },
    { name: "Suppliers", href: "/suppliers" },
    { name: "Reports", href: "/reports" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold">AIVA</h1>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={`px-4 py-3 rounded-lg mb-2 cursor-pointer transition ${
                pathname === item.href
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}