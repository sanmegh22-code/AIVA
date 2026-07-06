"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProduct,
  updateProduct,
  uploadProductImage,
} from "../../services/product";

interface ProductFormState {
  name: string;
  sku: string;
  category: string;
  price: string;
  quantity: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [form, setForm] = useState<ProductFormState>({
    name: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await getProduct(Number(params.id));
        setForm({
          name: product.name ?? "",
          sku: product.sku ?? "",
          category: product.category ?? "",
          price: String(product.price ?? ""),
          quantity: String(product.quantity ?? 0),
        });
        if (product.image_url) {
          setPreview(`http://127.0.0.1:8000/${product.image_url}`);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  async function handleSave() {
    try {
      setSaving(true);

      const updated = await updateProduct(Number(params.id), {
        name: form.name,
        sku: form.sku,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      if (image) {
        await uploadProductImage(updated.id, image);
      }

      alert("Product updated successfully.");
      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f8f5] p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold">Edit Product</h1>
          <div />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border p-4"
          />

          <input
            type="text"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            className="rounded-xl border p-4"
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border p-4"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="rounded-xl border p-4"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="rounded-xl border p-4"
          />

          <div>
            <label className="mb-2 block font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border p-3"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {(preview || form.name) && (
            <div className="md:col-span-2 mt-2">
              <p className="mb-2 font-medium">Image Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="h-56 w-56 rounded-xl border object-cover"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-8 w-full rounded-xl bg-black py-4 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
      </div>
    </div>
  );
}
