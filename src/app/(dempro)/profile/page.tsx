import { Profile } from "@/components/profile-form";
import { getUser } from "@/lib/actions";

import { getServerUser } from "@/lib/api-helpers";

export default async function ProfilePage() {
  const { user } = await getServerUser();
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-red-500">Failed to load profile</div>
      </div>
    );
  }
  const { result: profileData } = await getUser(user.email);

  return <Profile profile={profileData} />;
}
