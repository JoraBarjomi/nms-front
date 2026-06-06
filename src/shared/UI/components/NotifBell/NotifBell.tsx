import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
  Divider,
} from "@mui/material";
import { useNotifications } from "../../../../features/notifications/NotificationsContext";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import { format, isToday, isYesterday, isValid } from "date-fns";

const formatTime = (timeString?: string) => {
  if (!timeString) return "Время неизвестно";
  const date = new Date(timeString);
  if (!isValid(date)) return "Wrong data format";
  if (isToday(date)) return `Today at ${format(date, "HH:mm")}`;
  if (isYesterday(date)) return `Yesterday at ${format(date, "HH:mm")}`;
  return format(date, "dd.MM.yyyy HH:mm");
};

export const NotificationBell: React.FC = () => {
  const {
    unreadCount = 0,
    latestAlarms = [],
    markAsRead = () => {},
  } = useNotifications() || {};
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (unreadCount > 0) markAsRead();
  };

  const handleClose = () => setAnchorEl(null);

  const handleNavigateToAlarms = () => {
    handleClose();
    navigate("/alarms");
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  const displayAlarms = latestAlarms.slice(0, 5);

  return (
    <>
      <IconButton color="inherit" onClick={handleClick} aria-describedby={id}>
        <Badge badgeContent={latestAlarms.length} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            width: 350,
            maxHeight: 500,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontSize="1rem" fontWeight="bold">
              Alarms Notifications
            </Typography>
          </Box>

          <List sx={{ p: 0, overflowY: "auto", flexGrow: 1 }}>
            {displayAlarms.length === 0 ? (
              <ListItemText
                primary="No active events"
                sx={{ textAlign: "center", color: "text.secondary", p: 3 }}
              />
            ) : (
              displayAlarms.map((alarm) => (
                <ListItemButton
                  key={alarm.id}
                  onClick={handleNavigateToAlarms}
                  divider
                  sx={{
                    borderLeft: 4,
                    borderColor:
                      alarm.severity === "critical"
                        ? "error.main"
                        : "warning.main",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={alarm.message}
                    secondary={formatTime(alarm.created_at)}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItemButton>
              ))
            )}
          </List>

          {latestAlarms.length > 5 && (
            <Typography
              variant="caption"
              sx={{ textAlign: "center", py: 1, color: "text.secondary" }}
            >
              +{latestAlarms.length - 5} more alarms...
            </Typography>
          )}

          <Divider />
        </Box>
      </Popover>
    </>
  );
};
