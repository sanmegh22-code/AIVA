"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createProduct,
  uploadProductImage,
} from "../services/product";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const product = await createProduct({
        name,
        sku,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });

      if (image) {
        await uploadProductImage(product.id, image);
      }

      alert("Product created successfully.");

      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f5] p-8">

      <div className="max-w-4xl mx-auto bg-white border rounded-2xl shadow-sm p-8">

        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() => router.back()}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold">
            Add Product
          </h1>

          <div />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-xl p-4"
          />

          <div>

            <label className="block mb-2 font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="border rounded-xl p-3 w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setImage(file);

                setPreview(
                  URL.createObjectURL(file)
                );
              }}
            />

          </div>
                    {preview && (
            <div className="md:col-span-2 mt-2">

              <p className="font-medium mb-2">
                Image Preview
              </p>

              <img
                src={preview}
                alt="Preview"
                className="w-56 h-56 object-cover rounded-xl border"
              />

            </div>
          )}

        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-8 bg-black text-white py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

      </div>

    </div>
  );
}