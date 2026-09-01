export function getAdminCreds() {
  return {
    id: process.env.ADMIN_ID || "smautomation1234@gmail.com",
    password: process.env.ADMIN_PASSWORD || "Mahesh@2004",
  };
}

export const ADMIN_ALLOWLIST: Array<{ id: string; password: string }> = [
  { id: "smautomation1234@gmail.com", password: "Mahesh@2004" },
  { id: "kapavamoda1234@gmail.com", password: "Mahesh@2004" },
];

export function isAdminValid(id: string, password: string) {
  const primary = getAdminCreds();
  // allow env primary + hardcoded allowlist (case-insensitive email)
  const norm = (s: string) => s.trim().toLowerCase();
  if (norm(id) === norm(primary.id) && password === primary.password) return true;
  return ADMIN_ALLOWLIST.some(a => norm(a.id) === norm(id) && a.password === password);
}

export const ADMIN_COOKIE = "kapa_admin";
export function isAuthenticated(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  return cookieHeader.includes(`${ADMIN_COOKIE}=1`);
}
