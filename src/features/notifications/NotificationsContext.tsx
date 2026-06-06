import React, { createContext, useContext, useEffect, useState } from "react";
import { type Alarms } from "../../entities/Alarms/Alarms";
import { fetchAlarms } from "../../entities/Alarms/api/apiAlarms";
import { getToken } from "../../shared/utils/authHelpers";

interface NotificationContextType {
  unreadCount: number;
  latestAlarms: Alarms[];
  markAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [latestAlarms, setLatestAlarms] = useState<Alarms[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadTime, setLastReadTime] = useState(
    () =>
      localStorage.getItem("lastReadAlarmsTime") || new Date(0).toISOString(),
  );

  useEffect(() => {
    const pollAlarms = async () => {
      const token = getToken();
      if (!token) {
        return;
      }

      try {
        const data = (await fetchAlarms({ limit: 200 })) as unknown as Alarms[];
        const highPriorityAlarms = data.filter(
          (a) => a.severity === "critical" || a.severity === "major",
        );

        setLatestAlarms(highPriorityAlarms);

        const unread = highPriorityAlarms.filter(
          (a) => new Date(a.created_at) > new Date(lastReadTime),
        );
        setUnreadCount(unread.length);
      } catch (error) {
        console.error("Failed to fetch alarms for bell:", error);
      }
    };

    pollAlarms();
    const interval = setInterval(pollAlarms, 30000);
    return () => clearInterval(interval);
  }, [lastReadTime]);

  const markAsRead = () => {
    const now = new Date().toISOString();
    setLastReadTime(now);
    localStorage.setItem("lastReadAlarmsTime", now);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ unreadCount, latestAlarms, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
