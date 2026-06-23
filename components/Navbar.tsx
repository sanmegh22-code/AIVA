export default function Navbar() {
  return (
    <header className="bg-white border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Dashboard
        </h1>

        <p className="text-sm text-zinc-500">
          Welcome back to AIVA
        </p>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-zinc-800"
        />

        <button className="w-10 h-10 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-semibold">
          A
        </div>

      </div>
    </header>
  );
}