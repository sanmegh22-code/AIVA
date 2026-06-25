import Link from "next/link";

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border p-8">

        <div className="flex justify-between items-center mb-8">
          <Link href="/products">
            <button className="border px-4 py-2 rounded-lg">
              ← Back
            </button>
          </Link>

          <Link href="/edit-product">
            <button className="bg-black text-white px-5 py-2 rounded-lg">
              Edit Product
            </button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">
          Product Details
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="border rounded-xl h-96 flex items-center justify-center bg-gray-100">
            Product Image
          </div>

          <div className="space-y-4">

            <p>
              <strong>Name:</strong> Laptop
            </p>

            <p>
              <strong>SKU:</strong> LP001
            </p>

            <p>
              <strong>Category:</strong> Electronics
            </p>

            <p>
              <strong>Supplier:</strong> ABC Electronics
            </p>

            <p>
              <strong>Stock:</strong> 50
            </p>

            <p>
              <strong>Price:</strong> ₹50,000
            </p>

            <p>
              <strong>Status:</strong>
              <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                In Stock
              </span>
            </p>

            <p>
              <strong>Last Updated:</strong>
              23 June 2026
            </p>

            <div className="pt-4">
              <strong>Description:</strong>

              <p className="text-gray-600 mt-2">
                High-performance business laptop with
                latest processor, SSD storage and
                long battery life.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}