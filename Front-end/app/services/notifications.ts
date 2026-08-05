import { apiFetch } from "./api";

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  notification_type: string;
  priority: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  read: number;
}

export function getNotifications(): Promise<Notification[]> {
  return apiFetch("/notifications/");
}

export function getRecentNotifications(): Promise<Notification[]> {
  return apiFetch("/notifications/recent");
}

export function getUnreadCount(): Promise<{ unread: number }> {
  return apiFetch("/notifications/unread-count");
}

export function getNotificationStats(): Promise<NotificationStats> {
  return apiFetch("/notifications/stats");
}

export function markNotificationRead(id: number) {
  return apiFetch(`/notifications/${id}/read`, {
    method: "PATCH",
  });
}

export function markAllNotificationsRead() {
  return apiFetch("/notifications/read-all", {
    method: "PATCH",
  });
}

export function deleteNotification(id: number) {
  return apiFetch(`/notifications/${id}`, {
    method: "DELETE",
  });
}
