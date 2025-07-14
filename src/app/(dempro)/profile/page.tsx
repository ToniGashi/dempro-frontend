// app/profile/page.tsx
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/api-helpers";
import ProfileShell from "@/components/ProfileShell";

export default async function ProfilePage() {
  const { user } = await getServerUser();
  if (!user) {
    redirect("/signin");
  }

  return <ProfileShell user={user} />;
}
