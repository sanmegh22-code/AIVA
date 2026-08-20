"use client";

import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { Brain, TrendingUp, AlertTriangle, Warehouse } from "lucide-react";

const insights = [
  {
    title: "Low Stock Risk",
    value: "8 Products",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "Warehouse Efficiency",
    value: "94%",
    icon: Warehouse,
    color: "text-blue-400",
  },
  {
    title: "Sales Trend",
    value: "+12%",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    title: "AI Confidence",
    value: "98%",
    icon: Brain,
    color: "text-purple-400",
  },
];

export default function AIInsightsPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold text-white">AI Insights</h1>
          <p className="mt-2 text-zinc-500">
            AI-powered business insights.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {insights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <Icon className={item.color} size={30} />

                  <h2 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}