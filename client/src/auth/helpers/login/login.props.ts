import type { NavigateFunction } from "react-router-dom";

export const loginFields = [
  { name: "username", label: "שם משתמש" },
  { name: "password", label: "סיסמה", type: "password" },
];

export const getLoginLinks = (navigate: NavigateFunction) => [
  { text: "אין לך חשבון? הרשמה", onClick: () => navigate("/register") },
  { text: "שכחת סיסמה?", onClick: () => navigate("/forgot-password") },
];
