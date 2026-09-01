export function getAdminCreds() {
  return {
    id: process.env.ADMIN_ID || "smautomation1234@gmail.com",
    password: process.env.ADMIN_PASSWORD || "Mahesh@2004",
  };
}

export const ADMIN_COOKIE = "kapa_admin";
export function isAuthenticated(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  return cookieHeader.includes(`${ADMIN_COOKIE}=1`);
}
