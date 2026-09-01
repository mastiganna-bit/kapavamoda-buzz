import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/auth";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (token !== "1") redirect("/admin/login");
  return <AdminClient />;
}
