import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f8f5]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <StatCard
              title="Total Products"
              value="1,250"
              change="+12% this month"
            />

            <StatCard
              title="Inventory Value"
              value="₹12.5L"
              change="+8% this month"
            />

            <StatCard
              title="Low Stock Alerts"
              value="23"
              change="Needs attention"
            />

            <StatCard
              title="Orders Today"
              value="48"
              change="+5 since yesterday"
            />

          </div>

          <div className="mt-8 bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">
              <div className="border-b pb-3">
                Product "Laptop" stock updated
              </div>

              <div className="border-b pb-3">
                New supplier added
              </div>

              <div className="border-b pb-3">
                Order #1024 completed
              </div>

              <div>
                Inventory report generated
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}