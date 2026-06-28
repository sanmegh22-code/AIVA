"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

import { getSupplier, deleteSupplier } from "../../services/supplier";

export default function SupplierDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const supplierId = Number(params.id);

  const [supplier, setSupplier] = useState<any>(null);

  useEffect(() => {
    async function loadSupplier() {
      try {
        const data = await getSupplier(supplierId);
        setSupplier(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (supplierId) {
      loadSupplier();
    }
  }, [supplierId]);

  async function handleDelete() {
    if (!confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(supplierId);
      alert("Supplier deleted successfully.");
      router.push("/suppliers");
    } catch (error) {
      console.error(error);
      alert("Failed to delete supplier.");
    }
  }

  if (!supplier) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <button
        onClick={() => router.back()}
        className="mb-6 border px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        ← Back
      </button>

      <div className="bg-white border rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-bold mb-8">
          Supplier Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-semibold">{supplier.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p>{supplier.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p>{supplier.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">GST Number</p>
            <p>{supplier.gst_number || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">City</p>
            <p>{supplier.city || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">State</p>
            <p>{supplier.state || "-"}</p>
          </div>

        </div>

        <div className="mt-8">
          <p className="text-gray-500 mb-2">
            Address
          </p>

          <div className="border rounded-lg p-4">
            {supplier.address || "-"}
          </div>
        </div>

        <div className="flex gap-4 mt-8">

          <Link href={`/edit-supplier/${supplier.id}`}>
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Edit
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}