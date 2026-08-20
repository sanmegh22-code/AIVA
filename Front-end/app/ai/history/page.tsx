"use client";

import { Clock, MessageSquare, Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

const history = [
  {
    id: 1,
    question: "Show low stock items",
    answer: "Found 8 products with low stock levels.",
    time: "Today • 10:30 AM",
  },
  {
    id: 2,
    question: "What should I reorder this week?",
    answer: "Rice, Sugar and Cooking Oil should be reordered.",
    time: "Yesterday • 4:15 PM",
  },
  {
    id: 3,
    question: "Summarize today's business",
    answer: "Sales increased by 12% compared to yesterday.",
    time: "Yesterday • 9:00 AM",
  },
];

export default function AIHistoryPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              AI History
            </h1>

            <p className="mt-2 text-zinc-500">
              View your previous conversations with AIVA.
            </p>
          </div>

          <div className="mb-6 relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-zinc-500"
            />

            <input
              placeholder="Search conversations..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none"
            />
          </div>

          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare
                      size={18}
                      className="text-white"
                    />
                    <h2 className="font-semibold text-white">
                      {item.question}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Clock size={14} />
                    {item.time}
                  </div>
                </div>

                <p className="mt-3 text-sm text-zinc-400">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}