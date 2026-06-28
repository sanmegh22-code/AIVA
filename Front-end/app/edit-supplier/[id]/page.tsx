"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import {
  getSupplier,
  updateSupplier,
} from "../../services/supplier";

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();

  const supplierId = Number(params.id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    async function loadSupplier() {
      try {
        const supplier = await getSupplier(supplierId);

        setForm({
          name: supplier.name || "",
          email: supplier.email || "",
          phone: supplier.phone || "",
          gst_number: supplier.gst_number || "",
          address: supplier.address || "",
          city: supplier.city || "",
          state: supplier.state || "",
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (supplierId) {
      loadSupplier();
    }
  }, [supplierId]);

  async function handleUpdate() {
    try {
      await updateSupplier(supplierId, form);

      alert("Supplier updated successfully.");

      router.push("/suppliers");
    } catch (error) {
      console.error(error);
      alert("Failed to update supplier.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex justify-center items-center p-6">

      <div className="bg-white rounded-2xl border shadow-sm w-full max-w-5xl p-8">

        <button
          onClick={() => router.back()}
          className="border px-4 py-2 rounded-lg mb-8"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold mb-8">
          Edit Supplier
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            className="border rounded-xl p-4"
            placeholder="Supplier Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-4"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-4"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-4"
            placeholder="GST Number"
            value={form.gst_number}
            onChange={(e) =>
              setForm({
                ...form,
                gst_number: e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-4"
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-4"
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value,
              })
            }
          />

        </div>

        <textarea
          rows={4}
          className="w-full border rounded-xl p-4 mt-5"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <button
          onClick={handleUpdate}
          className="mt-8 w-full bg-black text-white py-4 rounded-xl"
        >
          Update Supplier
        </button>

      </div>

    </div>
  );
}