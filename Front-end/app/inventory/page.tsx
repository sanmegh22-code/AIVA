"use client";

import { useState } from "react";
import Link from "next/link";

export default function InventoryPage() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      sku: "LP001",
      category: "Electronics",
      stock: 50,
      price: "₹50,000",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Mouse",
      sku: "MS002",
      category: "Accessories",
      stock: 5,
      price: "₹500",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Keyboard",
      sku: "KB003",
      category: "Accessories",
      stock: 25,
      price: "₹1,200",
      status: "In Stock",
    },
    {
      id: 4,
      name: "Monitor",
      sku: "MN004",
      category: "Electronics",
      stock: 0,
      price: "₹12,000",
      status: "Out of Stock",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

      const matchesCategory =
      category === "All" || product.category === category;

    const matchesStatus =
      status === "All" || product.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Inventory</h1>

        <Link href="/add-product">
          <button className="bg-black text-white px-5 py-3 rounded-lg">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500">Total Items</p>
          <h2 className="text-3xl font-bold">1250</h2>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500">Low Stock</p>
          <h2 className="text-3xl font-bold text-yellow-600">23</h2>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500">Out Of Stock</p>
          <h2 className="text-3xl font-bold text-red-600">5</h2>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500">Inventory Value</p>
          <h2 className="text-3xl font-bold">₹12.5L</h2>
        </div>

      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">

        <input
          type="text"
          placeholder="Search Product..."
          className="border rounded-lg px-4 py-3 w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Accessories</option>
        </select>

        <select
          className="border rounded-lg px-4 py-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">SKU</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">

                <td className="p-4">{product.name}</td>

                <td className="p-4">{product.sku}</td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">{product.price}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  <Link href={`/products/${product.id}`}>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded">
                      View
                    </button>
                  </Link>

                  <button className="bg-gray-800 text-white px-3 py-2 rounded">
                    Update
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}