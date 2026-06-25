import Link from "next/link";

export default function SupplierDetailsPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto bg-white border rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/suppliers">
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
              ← Back
            </button>
          </Link>

          <Link href="/edit-supplier">
            <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800">
              Edit Supplier
            </button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-10">
          Supplier Details
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="space-y-6">
            <div>
              <p className="text-gray-500">Supplier Name</p>
              <h2 className="text-2xl font-semibold">
                ABC Electronics
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Contact Number</p>
              <p className="text-lg">
                9876543210
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email Address</p>
              <p className="text-lg">
                abc@gmail.com
              </p>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <p className="text-lg">
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-gray-500">Status</p>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
                Active
              </span>
            </div>

            <div>
              <p className="text-gray-500">Products Supplied</p>

              <ul className="list-disc ml-6 space-y-1">
                <li>Laptop</li>
                <li>Monitor</li>
                <li>Keyboard</li>
                <li>Mouse</li>
              </ul>
            </div>

            <div>
              <p className="text-gray-500">Last Order Date</p>

              <p className="text-lg">
                20 June 2026
              </p>
            </div>

            <div>
              <p className="text-gray-500">Total Products Supplied</p>

              <p className="text-3xl font-bold">
                125
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}