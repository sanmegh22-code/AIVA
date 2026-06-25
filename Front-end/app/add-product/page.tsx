"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            sku,
            quantity: Number(quantity),
            price: Number(price),
            category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      alert("Product Added Successfully!");
      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] p-8">
      <div className="max-w-3xl mx-auto bg-white border rounded-2xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="border px-4 py-2 rounded-lg"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            Add Product
          </h1>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}