"use client";

import { useRouter } from "next/navigation";

export default function EditSupplierPage() {
  const router = useRouter();

  const handleUpdate = () => {
    alert("Supplier Updated Successfully!");
    router.push("/suppliers");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f5] p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md border p-8">

        <button
          onClick={() => router.back()}
          className="border px-4 py-2 rounded-lg mb-6 hover:bg-gray-100"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-center mb-10">
          Edit Supplier
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            defaultValue="ABC Electronics"
            placeholder="Supplier Name"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            defaultValue="9876543210"
            placeholder="Contact Number"
            className="border rounded-xl p-4"
          />

          <input
            type="email"
            defaultValue="abc@gmail.com"
            placeholder="Email Address"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            defaultValue="27ABCDE1234F1Z5"
            placeholder="GST Number"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            defaultValue="Mumbai"
            placeholder="City"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            defaultValue="Maharashtra"
            placeholder="State"
            className="border rounded-xl p-4"
          />

          <select className="border rounded-xl p-4">
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <input
            type="number"
            defaultValue="125"
            placeholder="Total Products Supplied"
            className="border rounded-xl p-4"
          />
        </div>

        <textarea
          defaultValue="Mumbai, Maharashtra, India"
          placeholder="Supplier Address"
          className="w-full border rounded-xl p-4 mt-6 h-32"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold mt-6 hover:bg-gray-800 transition"
        >
          Update Supplier
        </button>

      </div>
    </div>
  );
}