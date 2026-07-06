"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/category";

interface CategoryItem {
  id: number;
  name: string;
  description?: string | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = { name, description: description || null };

      if (editingId) {
        await updateCategory(editingId, payload);
      } else {
        await createCategory(payload);
      }

      setName("");
      setDescription("");
      setEditingId(null);
      await loadCategories();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.error(error);
    }
  }

  function startEdit(category: CategoryItem) {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || "");
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">Categories</h1>
        <Link href="/dashboard">
          <button className="bg-black text-white px-6 py-3 rounded-lg">Back to Dashboard</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button type="submit" className="bg-black text-white px-5 py-3 rounded-lg">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId ? (
            <button
              type="button"
              className="border px-5 py-3 rounded-lg"
              onClick={() => {
                setEditingId(null);
                setName("");
                setDescription("");
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="rounded-2xl border overflow-hidden bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-5">Name</th>
              <th className="text-left p-5">Description</th>
              <th className="text-left p-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-5 font-medium">{category.name}</td>
                <td className="p-5">{category.description || "-"}</td>
                <td className="p-5 flex gap-2">
                  <button
                    className="border px-3 py-2 rounded-lg"
                    onClick={() => startEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-2 rounded-lg"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
