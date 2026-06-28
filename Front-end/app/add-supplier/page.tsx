"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupplier } from "../services/supplier";

export default function AddSupplierPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      setLoading(true);

      await createSupplier(form);

      alert("Supplier added successfully!");

      router.push("/suppliers");
    } catch (err) {
      console.error(err);
      alert("Failed to add supplier.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex justify-center items-center p-6">

      <div className="bg-white border rounded-2xl shadow-sm p-8 w-full max-w-4xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Add Supplier
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Supplier Name"
            className="border rounded-xl p-4"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border rounded-xl p-4"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border rounded-xl p-4"
          />

          <input
            name="gst_number"
            value={form.gst_number}
            onChange={handleChange}
            placeholder="GST Number"
            className="border rounded-xl p-4"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-xl p-4"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="border rounded-xl p-4"
          />

        </div>

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Supplier Address"
          rows={4}
          className="w-full border rounded-xl p-4 mt-5"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-6 bg-black text-white py-4 rounded-xl hover:bg-gray-800"
        >
          {loading ? "Saving..." : "Save Supplier"}
        </button>

      </div>

    </div>
  );
}