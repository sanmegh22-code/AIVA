"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getRecentNotifications,
  getUnreadCount,
  markNotificationRead,
  type Notification,
} from "../app/services/notifications";

export default function Navbar() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowProfileMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

const [notifications, setNotifications] = useState<Notification[]>([]);
const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  async function loadNotifications() {
    try {
      const [recent, count] = await Promise.all([
        getRecentNotifications(),
        getUnreadCount(),
      ]);

      setNotifications(recent);
      setUnreadCount(count.unread);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }

  loadNotifications();
}, []);

const handleNotificationClick = async (notification: Notification) => {
  if (notification.is_read) return;

  try {
    await markNotificationRead(notification.id);

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, is_read: true }
          : item
      )
    );

    setUnreadCount((count) => Math.max(0, count - 1));
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090B]/95 backdrop-blur">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold text-white">AIVA Inventory</h1>
          <p className="mt-1 text-sm text-zinc-500">Inventory Management System</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications((value) => !value);
                setShowProfileMenu(false);
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 transition hover:border-white"
            >
              <Bell size={20} className="text-white" />
{unreadCount > 0 && (
  <span className="absolute right-2 top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
    {unreadCount > 99 ? "99+" : unreadCount}
  </span>
)}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-80 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl">
                <div className="mb-2 px-2 text-sm font-semibold text-white">Notifications</div>
<div className="space-y-2">
  {notifications.length === 0 ? (
    <p className="px-2 py-4 text-sm text-zinc-500">
      No notifications yet.
    </p>
  ) : (
    notifications.map((item) => (
      <button
        key={item.id}
        onClick={() => handleNotificationClick(item)}
        className={`w-full rounded-xl border p-3 text-left transition ${
          item.is_read
            ? "border-zinc-800 bg-zinc-900"
            : "border-zinc-700 bg-zinc-800"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-white">
            {item.title}
          </p>

          {!item.is_read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
          )}
        </div>

        <p className="mt-1 text-sm text-zinc-500">
          {item.message}
        </p>
      </button>
    ))
  )}
</div>
                </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((value) => !value);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2 transition hover:border-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                <User size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Sanmegh</p>
                <p className="text-xs text-zinc-500">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-zinc-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-56 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                  <p className="font-semibold text-white">Sanmegh</p>
                  <p className="text-sm text-zinc-500">Administrator</p>
                </div>
                <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white">
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-400 transition hover:bg-zinc-900 hover:text-red-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
