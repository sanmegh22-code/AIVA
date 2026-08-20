"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Settings, Bell, Mail, Database, Moon } from "lucide-react";

export default function IntegrationsPage() {
  const [email, setEmail] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [backup, setBackup] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative h-7 w-14 rounded-full transition ${
        checked ? "bg-blue-500" : "bg-zinc-700"
      }`}
    >
      <div
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-8" : "left-1"
        }`}
      />
    </button>
  );

  const items = [
    {
      title: "Email Notifications",
      desc: "Receive inventory updates by email.",
      icon: Mail,
      checked: email,
      toggle: () => setEmail(!email),
    },
    {
      title: "Push Notifications",
      desc: "Enable browser notifications.",
      icon: Bell,
      checked: notifications,
      toggle: () => setNotifications(!notifications),
    },
    {
      title: "Automatic Backup",
      desc: "Backup inventory database daily.",
      icon: Database,
      checked: backup,
      toggle: () => setBackup(!backup),
    },
    {
      title: "Dark Mode",
      desc: "Use dark appearance.",
      icon: Moon,
      checked: darkMode,
      toggle: () => setDarkMode(!darkMode),
    },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Integration Settings
              </h1>

              <p className="mt-2 text-zinc-500">
                Manage application preferences and integrations.
              </p>
            </div>

            <Settings size={34} className="text-white" />
          </div>

          <div className="mt-8 space-y-5">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-zinc-900 p-3">
                      <Icon className="text-blue-400" size={22} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <Toggle
                    checked={item.checked}
                    onChange={item.toggle}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}