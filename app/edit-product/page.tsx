"use client";

import { useRouter } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();

  const handleUpdate = () => {
    alert("Product Updated Successfully!");
    router.push("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f5] p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border p-8">

        <button
          onClick={() => router.back()}
          className="border px-4 py-2 rounded-lg mb-6 hover:bg-gray-100"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-center mb-8">
          Edit Product
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            defaultValue="Laptop"
            placeholder="Product Name"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            defaultValue="LP001"
            placeholder="SKU"
            className="border rounded-xl p-4"
          />

          <select className="border rounded-xl p-4">
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
          </select>

          <input
            type="text"
            defaultValue="ABC Electronics"
            placeholder="Supplier Name"
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            defaultValue="50"
            placeholder="Stock Quantity"
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            defaultValue="50000"
            placeholder="Price"
            className="border rounded-xl p-4"
          />

          <select className="border rounded-xl p-4">
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out Of Stock</option>
          </select>

          <input
            type="file"
            className="border rounded-xl p-4"
          />
        </div>

        <textarea
          placeholder="Product Description"
          defaultValue="High-performance business laptop with SSD storage."
          className="w-full border rounded-xl p-4 mt-6 h-32"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold mt-6 hover:bg-gray-800 transition"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}