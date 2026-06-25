import Link from "next/link";

export default function SuppliersPage() {
  const suppliers = [
    {
      id: 1,
      name: "ABC Electronics",
      contact: "9876543210",
      email: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Tech Supplies",
      contact: "9876501234",
      email: "tech@gmail.com",
    },
    {
      id: 3,
      name: "Global Traders",
      contact: "9876511111",
      email: "global@gmail.com",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">
          Suppliers
        </h1>

        <Link href="/add-supplier">
          <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800">
            + Add Supplier
          </button>
        </Link>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-6 text-left">Name</th>
              <th className="p-6 text-left">Contact</th>
              <th className="p-6 text-left">Email</th>
              <th className="p-6 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t">
                <td className="p-6">{supplier.name}</td>
                <td className="p-6">{supplier.contact}</td>
                <td className="p-6">{supplier.email}</td>

                <td className="p-6 flex gap-3">
                  <Link href={`/suppliers/${supplier.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      View
                    </button>
                  </Link>

                  <Link href="/edit-supplier">
                    <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                      Edit
                    </button>
                  </Link>

                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
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