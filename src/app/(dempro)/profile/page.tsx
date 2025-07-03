import { redirect } from "next/navigation";

import { getServerUser } from "@/lib/api-helpers";

export default async function Profile() {
  const { user } = await getServerUser();
  if (!user) {
    redirect("/signin");
  }
  return <div className="text-3xl mt-8">Profile</div>;
}
