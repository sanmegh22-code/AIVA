import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f5]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        
        <h1 className="text-5xl font-bold text-center text-zinc-800 mb-3">
          AIVA
        </h1>

        <p className="text-center text-zinc-500 mb-10">
          Inventory Management System
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
          </div>

          <Link href="/dashboard">
            <button className="w-full bg-zinc-900 text-white py-3 rounded-xl hover:bg-zinc-800 transition">
              Sign In
            </button>
          </Link>

          <p className="text-center text-sm text-zinc-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-zinc-900"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}