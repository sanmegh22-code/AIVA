"use client";

export default function SettingsPage() {
  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white border rounded-2xl p-8 space-y-8">

        {/* Company Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Company Settings
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              defaultValue="AIVA Inventory"
              placeholder="Company Name"
              className="w-full border rounded-xl p-4"
            />

            <input
              type="email"
              defaultValue="admin@gmail.com"
              placeholder="Company Email"
              className="w-full border rounded-xl p-4"
            />

            <div>
              <label className="block mb-2 font-medium">
                Company Logo
              </label>

              <input
                type="file"
                className="w-full border rounded-xl p-4"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Appearance
          </h2>

          <select className="border rounded-xl p-4 w-full">
            <option>Light Mode ☀️</option>
            <option>Dark Mode 🌙</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Currency
          </h2>

          <select className="border rounded-xl p-4 w-full">
            <option>INR (₹)</option>
            <option>USD ($)</option>
          </select>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Notifications
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Low Stock Alerts
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              New Order Alerts
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}