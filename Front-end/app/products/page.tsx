"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">
          Products
        </h1>

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
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Accessories</option>
          <option>General</option>
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
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="p-5">
                  {product.name}
                </td>

                <td className="p-5">
                  {product.sku}
                </td>

                <td className="p-5">
                  {product.category}
                </td>

                <td className="p-5">
                  {product.quantity}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.quantity > 10
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.quantity > 10
                      ? "In Stock"
                      : "Low Stock"}
                  </span>
                </td>

                <td className="p-5">
                  ₹{product.price}
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