export function getAdminCreds() {
  // Hardcoded admin - ONLY kapavamoda as requested (not smautomation)
  return {
    id: "kapavamoda1234@gmail.com",
    password: "Mahesh@2004",
  };
}

export const ADMIN_ALLOWLIST: Array<{ id: string; password: string }> = [
  { id: "kapavamoda1234@gmail.com", password: "Mahesh@2004" },
];

export function isAdminValid(id: string, password: string) {
  const norm = (s: string) => s.trim().toLowerCase();
  // Hardcoded check - ignore env to guarantee it works
  return ADMIN_ALLOWLIST.some(a => norm(a.id) === norm(id) && a.password === password);
}

// Developer single account - hardcoded directly
export const DEV_CREDENTIALS = {
  id: "smautomation1234@gmail.com",
  password: "Mahesh@2004",
};

export function isDeveloperValid(id: string, password: string) {
  const norm = (s: string) => s.trim().toLowerCase();
  return norm(id) === norm(DEV_CREDENTIALS.id) && password === DEV_CREDENTIALS.password;
}

export const ADMIN_COOKIE = "kapa_admin";
export function isAuthenticated(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  return cookieHeader.includes(`${ADMIN_COOKIE}=1`);
}
