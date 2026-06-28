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
  User,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { getSuppliers } from "../services/supplier";

interface Supplier {

  id: number;

  name: string;

  email: string;

  phone: string;

  gst_number?: string | null;

  address?: string | null;

  city?: string | null;

  state?: string | null;

}

export default function SuppliersPage() {

  const [loading, setLoading] =
    useState(true);

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    async function loadSuppliers() {

      try {

        const data =
          await getSuppliers();

        setSuppliers(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadSuppliers();

  }, []);

  const filteredSuppliers =
    useMemo(() => {

      return suppliers.filter((supplier) =>

        supplier.name
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        supplier.email
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        supplier.phone
          .includes(search)

      );

    }, [suppliers, search]);

  return (

    <div className="flex min-h-screen bg-[#09090B] text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">

            <div>

              <h1 className="text-5xl font-black">

                Suppliers

              </h1>

              <p className="mt-3 text-zinc-400">

                Manage suppliers and contact information.

              </p>

            </div>

            <Link href="/add-supplier">

              <Button>

                <Plus size={18} />

                <span className="ml-2">

                  Add Supplier

                </span>

              </Button>

            </Link>

          </div>

          <div className="relative mb-10">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input

              placeholder="Search supplier..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="pl-12"

            />

          </div>
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#18181B] shadow-xl">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-zinc-900">

                  <tr>

                    <th className="px-6 py-5 text-left">Supplier</th>

                    <th className="px-6 py-5 text-left">Contact</th>

                    <th className="px-6 py-5 text-left">GST</th>

                    <th className="px-6 py-5 text-left">Location</th>

                    <th className="px-6 py-5 text-center">Actions</th>

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
                          colSpan={5}
                          className="px-6 py-5"
                        >

                          <Skeleton className="h-16 rounded-xl" />

                        </td>

                      </tr>

                    ))

                  ) : filteredSuppliers.length === 0 ? (

                    <tr>

                      <td
                        colSpan={5}
                        className="py-20 text-center"
                      >

                        <User
                          size={56}
                          className="mx-auto text-zinc-700"
                        />

                        <p className="mt-5 text-zinc-500">

                          No Suppliers Found

                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredSuppliers.map((supplier) => (

                      <tr
                        key={supplier.id}
                        className="border-t border-zinc-800 transition hover:bg-zinc-900"
                      >

                        {/* Supplier */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700">

                              <User size={24} />

                            </div>

                            <div>

                              <h3 className="font-semibold text-lg">

                                {supplier.name}

                              </h3>

                              <p className="mt-1 text-sm text-zinc-500">

                                Supplier ID #{supplier.id}

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Contact */}

                        <td className="px-6 py-5">

                          <div className="space-y-2">

                            <div className="flex items-center gap-2">

                              <Mail
                                size={15}
                                className="text-zinc-500"
                              />

                              <span>

                                {supplier.email}

                              </span>

                            </div>

                            <div className="flex items-center gap-2">

                              <Phone
                                size={15}
                                className="text-zinc-500"
                              />

                              <span>

                                {supplier.phone}

                              </span>

                            </div>

                          </div>

                        </td>

                        {/* GST */}

                        <td className="px-6 py-5">

                          <span className="rounded-xl bg-zinc-900 px-3 py-2 text-sm">

                            {supplier.gst_number || "--"}

                          </span>

                        </td>

                        {/* Address */}

                        <td className="px-6 py-5">

                          <div className="flex items-start gap-2">

                            <MapPin
                              size={16}
                              className="mt-1 text-zinc-500"
                            />

                            <div>

                              <p>

                                {supplier.address || "--"}

                              </p>

                              <p className="text-sm text-zinc-500">

                                {supplier.city || "--"}

                                {supplier.state
                                  ? `, ${supplier.state}`
                                  : ""}

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex justify-center gap-3">

                            <Link
                              href={`/edit-supplier/${supplier.id}`}
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
                                    `Delete "${supplier.name}"?`
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

              {/* Total Suppliers */}

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Total Suppliers

                </h3>

                <p className="mt-5 text-5xl font-black">

                  {suppliers.length}

                </p>

                <p className="mt-3 text-sm text-zinc-500">

                  Registered suppliers

                </p>

              </div>

              {/* GST Registered */}

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  GST Registered

                </h3>

                <p className="mt-5 text-5xl font-black">

                  {

                    suppliers.filter(

                      (supplier) =>

                        supplier.gst_number &&
                        supplier.gst_number.trim() !== ""

                    ).length

                  }

                </p>

                <p className="mt-3 text-sm text-zinc-500">

                  Suppliers with GST

                </p>

              </div>

              {/* Cities */}

              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-7">

                <h3 className="text-lg font-bold">

                  Cities Covered

                </h3>

                <p className="mt-5 text-5xl font-black">

                  {

                    new Set(

                      suppliers

                        .filter((s) => s.city)

                        .map((s) => s.city)

                    ).size

                  }

                </p>

                <p className="mt-3 text-sm text-zinc-500">

                  Unique supplier locations

                </p>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );

}