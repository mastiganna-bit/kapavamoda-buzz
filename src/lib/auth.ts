export function getAdminCreds() {
  return {
    id: process.env.ADMIN_ID || "kapavamoda",
    password: process.env.ADMIN_PASSWORD || "kapa_2026",
  };
}

export const ADMIN_COOKIE = "kapa_admin";
export function isAuthenticated(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  return cookieHeader.includes(`${ADMIN_COOKIE}=1`);
}
