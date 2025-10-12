import type { NavigateFunction } from "react-router-dom";

export const registerFields = [
  { name: "username", label: "שם משתמש" },
  { name: "password", label: "סיסמה", type: "password" },
];

export const getRegisterLinks = (navigate: NavigateFunction) => [
  { text: "יש לך כבר חשבון? הכנס", onClick: () => navigate("/login") },
  // { text: "שכחת סיסמה?", onClick: () => navigate("/forgot-password") },
];
