"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      sku: "LP001",
      category: "Electronics",
      stock: 50,
      price: "₹50,000",
      supplier: "ABC Electronics",
      status: "In Stock",
      description: "High-performance business laptop",
    },
    {
      id: 2,
      name: "Mouse",
      sku: "MS001",
      category: "Accessories",
      stock: 5,
      price: "₹500",
      supplier: "Tech Supplies",
      status: "Low Stock",
      description: "Wireless optical mouse",
    },
    {
      id: 3,
      name: "Keyboard",
      sku: "KB001",
      category: "Accessories",
      stock: 25,
      price: "₹1,200",
      supplier: "Tech Supplies",
      status: "In Stock",
      description: "Mechanical keyboard",
    },
    {
      id: 4,
      name: "Monitor",
      sku: "MN001",
      category: "Electronics",
      stock: 15,
      price: "₹12,000",
      supplier: "Global Traders",
      status: "In Stock",
      description: "24-inch Full HD Monitor",
    },
    {
      id: 5,
      name: "Headphones",
      sku: "HP001",
      category: "Accessories",
      stock: 20,
      price: "₹2,000",
      supplier: "ABC Electronics",
      status: "In Stock",
      description: "Noise-cancelling headphones",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">Products</h1>

        <Link href="/add-product">
          <button className="bg-black text-white px-6 py-3 rounded-lg">
            + Add Product
          </button>
        </Link>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
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
      </div>

      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-5">Product</th>
              <th className="text-left p-5">SKU</th>
              <th className="text-left p-5">Category</th>
              <th className="text-left p-5">Stock</th>
              <th className="text-left p-5">Status</th>
              <th className="text-left p-5">Price</th>
              <th className="text-left p-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-5">{product.name}</td>

                <td className="p-5">{product.sku}</td>

                <td className="p-5">{product.category}</td>

                <td className="p-5">{product.stock}</td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-5">{product.price}</td>

                <td className="p-5">
                  <Link href={`/products/${product.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}