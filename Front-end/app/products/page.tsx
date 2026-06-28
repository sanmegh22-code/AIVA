"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";

import {
  Plus,
  Search,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import { getProducts } from "../services/product";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity?: number;
  image_url?: string | null;
}

export default function ProductsPage() {

  const [loading, setLoading] = useState(true);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  useEffect(() => {

    async function loadProducts() {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadProducts();

  }, []);

  const filteredProducts =
    useMemo(() => {

      return products.filter((product) => {

        const matchSearch =

          product.name
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          product.sku
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =

          category === "All"

          ||

          product.category === category;

        return matchSearch && matchCategory;

      });

    }, [
      products,
      search,
      category,
    ]);

  return (

    <div className="flex min-h-screen bg-[#09090B] text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          {/* Header */}

          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">

            <div>

              <h1 className="text-5xl font-black">

                Products

              </h1>

              <p className="mt-3 text-zinc-400">

                Manage products, stock and pricing.

              </p>

            </div>

            <Link href="/add-product">

              <Button>

                <Plus size={18} />

                <span className="ml-2">

                  Add Product

                </span>

              </Button>

            </Link>

          </div>

          {/* Search */}

          <div className="grid lg:grid-cols-2 gap-6 mb-10">

            <div className="relative">

              <Search

                size={18}

                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"

              />

              <input

                placeholder="Search by product or SKU..."

                value={search}

                onChange={(e)=>

                  setSearch(e.target.value)

                }

                className="pl-12"

              />

            </div>

            <select

              value={category}

              onChange={(e)=>

                setCategory(e.target.value)

              }

            >

              <option>

                All

              </option>

              <option>

                Electronics

              </option>

              <option>

                Accessories

              </option>

              <option>

                General

              </option>

            </select>

          </div>
          {/* Products Table */}

          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#18181B] shadow-xl">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-zinc-900">

                  <tr className="text-left">

                    <th className="px-6 py-5 font-semibold">
                      Product
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      SKU
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Stock
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Price
                    </th>

                    <th className="px-6 py-5 font-semibold text-center">
                      Status
                    </th>

                    <th className="px-6 py-5 font-semibold text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    [...Array(6)].map((_, index) => (

                      <tr
                        key={index}
                        className="border-t border-zinc-800"
                      >

                        <td
                          colSpan={7}
                          className="px-6 py-5"
                        >

                          <Skeleton className="h-14 rounded-xl" />

                        </td>

                      </tr>

                    ))

                  ) : filteredProducts.length === 0 ? (

                    <tr>

                      <td
                        colSpan={7}
                        className="py-20 text-center"
                      >

                        <Package
                          size={60}
                          className="mx-auto text-zinc-700"
                        />

                        <p className="mt-5 text-zinc-500">

                          No Products Found

                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredProducts.map((product) => (

                      <tr
                        key={product.id}
                        className="border-t border-zinc-800 hover:bg-zinc-900 transition"
                      >

                        {/* Product */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            {product.image_url ? (

                              <img
                                src={`http://127.0.0.1:8000/${product.image_url}`}
                                alt={product.name}
                                className="h-16 w-16 rounded-2xl border border-zinc-700 object-cover"
                              />

                            ) : (

                              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900">

                                <Package
                                  size={26}
                                  className="text-zinc-600"
                                />

                              </div>

                            )}

                            <div>

                              <h3 className="font-semibold">

                                {product.name}

                              </h3>

                              <p className="mt-1 text-sm text-zinc-500">

                                Product ID #{product.id}

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* SKU */}

                        <td className="px-6 py-5">

                          <span className="rounded-xl bg-zinc-900 px-3 py-2 text-sm">

                            {product.sku}

                          </span>

                        </td>

                        {/* Category */}

                        <td className="px-6 py-5">

                          {product.category}

                        </td>

                        {/* Stock */}

                        <td className="px-6 py-5">

                          <span className="font-semibold">

                            {product.quantity ?? 0}

                          </span>

                        </td>

                        {/* Price */}

                        <td className="px-6 py-5 font-bold">

                          ₹{product.price.toLocaleString()}

                        </td>
                        {/* Status */}

                        <td className="px-6 py-5 text-center">

                          {(product.quantity ?? 0) > 10 ? (

                            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">

                              In Stock

                            </span>

                          ) : (product.quantity ?? 0) > 0 ? (

                            <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400">

                              Low Stock

                            </span>

                          ) : (

                            <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400">

                              Out of Stock

                            </span>

                          )}

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex justify-center gap-3">

                            <Link
                              href={`/products/${product.id}`}
                            >

                              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 transition hover:border-white hover:bg-zinc-800">

                                <Pencil size={18} />

                              </button>

                            </Link>

                            <button
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-700 bg-red-500/10 text-red-400 transition hover:bg-red-600 hover:text-white"
                              onClick={() => {

                                if (
                                  confirm(
                                    `Delete "${product.name}"?`
                                  )
                                ) {

                                  alert(
                                    "Delete API will be connected next."
                                  );

                                }

                              }}
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Summary Cards */}

          {!loading && (

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Total Products

                </h3>

                <p className="mt-5 text-5xl font-black">

                  {products.length}

                </p>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Categories

                </h3>

                <p className="mt-5 text-5xl font-black">

                  {
                    new Set(
                      products.map(
                        (p) => p.category
                      )
                    ).size
                  }

                </p>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Inventory Value

                </h3>

                <p className="mt-5 text-4xl font-black">

                  ₹
                  {products
                    .reduce(
                      (sum, p) =>
                        sum +
                        p.price *
                          (p.quantity ?? 0),
                      0
                    )
                    .toLocaleString()}

                </p>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );

}