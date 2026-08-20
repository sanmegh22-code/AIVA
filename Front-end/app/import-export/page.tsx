"use client";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Database,
} from "lucide-react";

const exportOptions = [
  {
    title: "Export CSV",
    description: "Download inventory data in CSV format.",
    icon: FileSpreadsheet,
    button: "Export CSV",
  },
  {
    title: "Export Excel",
    description: "Download inventory data as an Excel file.",
    icon: Database,
    button: "Export Excel",
  },
  {
    title: "Export PDF",
    description: "Generate a printable PDF report.",
    icon: FileText,
    button: "Export PDF",
  },
];

export default function ImportExportPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Import & Export
              </h1>

              <p className="mt-2 text-zinc-500">
                Import inventory or export reports in different formats.
              </p>
            </div>

            <Download className="text-white" size={34} />
          </div>

          {/* Import Section */}
          <div className="mt-8 rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <Upload className="mx-auto mb-4 text-blue-400" size={42} />

            <h2 className="text-xl font-semibold text-white">
              Import Inventory
            </h2>

            <p className="mt-2 text-zinc-400">
              Drag & drop a CSV or Excel file here, or click below.
            </p>

            <button className="mt-6 rounded-xl bg-white px-6 py-2 font-medium text-black hover:bg-zinc-200">
              Choose File
            </button>
          </div>

          {/* Export Options */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {exportOptions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <Icon className="mb-4 text-green-400" size={30} />

                  <h2 className="text-xl font-semibold text-white">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    {item.description}
                  </p>

                  <button className="mt-6 w-full rounded-xl bg-white py-2 font-medium text-black hover:bg-zinc-200">
                    {item.button}
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}