"use client";

import { useRouter } from "next/navigation";

export default function AddSupplierPage() {
  const router = useRouter();

  const handleSave = () => {
    alert("Supplier Added Successfully!");
    router.push("/suppliers");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex justify-center items-center p-6">
      <div className="bg-white border rounded-2xl shadow-sm p-8 w-full max-w-4xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Add Supplier
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Supplier Name"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Contact Number"
            className="border rounded-xl p-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="GST Number"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="City"
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="State"
            className="border rounded-xl p-4"
          />

        </div>

        <textarea
          placeholder="Supplier Address"
          rows={4}
          className="w-full border rounded-xl p-4 mt-5"
        />

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800"
          >
            Save Supplier
          </button>
        </div>

      </div>
    </div>
  );
}