export default function ReportsPage() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold mb-8">
        Reports & Analytics
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-4xl font-bold">1250</p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-500">Inventory Value</h2>
          <p className="text-4xl font-bold">₹12.5L</p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-500">Low Stock Items</h2>
          <p className="text-4xl font-bold text-red-500">23</p>
        </div>
      </div>

      <div className="border rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">
          Monthly Inventory Report
        </h2>

        <div className="space-y-4">
          <div>
            <p>January</p>
            <div className="bg-gray-200 rounded h-5">
              <div className="bg-blue-500 h-5 rounded w-[40%]"></div>
            </div>
          </div>

          <div>
            <p>February</p>
            <div className="bg-gray-200 rounded h-5">
              <div className="bg-blue-500 h-5 rounded w-[60%]"></div>
            </div>
          </div>

          <div>
            <p>March</p>
            <div className="bg-gray-200 rounded h-5">
              <div className="bg-blue-500 h-5 rounded w-[80%]"></div>
            </div>
          </div>

          <div>
            <p>April</p>
            <div className="bg-gray-200 rounded h-5">
              <div className="bg-blue-500 h-5 rounded w-[90%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}