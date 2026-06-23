"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    alert("Product Added Successfully!");
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] p-8">
      <div className="max-w-3xl mx-auto bg-white border rounded-2xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="border px-4 py-2 rounded-lg"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold">
            Add Product
          </h1>

          <div />
        </div>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-4"
          >
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
          </select>

          <input
            type="text"
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <textarea
            placeholder="Product Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="file"
            className="w-full border rounded-xl p-4"
          />

          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800"
          >
            Add Product
          </button>

        </div>
      </div>
    </div>
  );
}