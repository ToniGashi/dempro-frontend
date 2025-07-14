// components/ProfileShell.tsx
"use client";

import { LimitedUserProfile } from "@/lib/types";
import {
  Mail as MailIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Link as LinkIcon,
} from "lucide-react";

interface Props {
  user: LimitedUserProfile;
}

export default function ProfileShell({ user }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-12">
      {/* — Header: Avatar, Name, Title, Edit Button — */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={"/default-avatar.png"}
            alt={`${user.fullName} avatar`}
            className="w-16 h-16 rounded-full bg-gray-200 object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{user.fullName}</h1>
            {user.email && <p className="text-gray-500">{user.email}</p>}
          </div>
        </div>
        <button className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50">
          Edit profile
        </button>
      </div>

      {/* — Basic Information — */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Basic Information</h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-gray-700">
            <MailIcon className="w-5 h-5 text-gray-400" />
            <span>{user.email}</span>
          </li>
          {user.location && (
            <li className="flex items-center space-x-2 text-gray-700">
              <MapPinIcon className="w-5 h-5 text-gray-400" />
              <span>{user.location}</span>
            </li>
          )}
          {user.phone && (
            <li className="flex items-center space-x-2 text-gray-700">
              <PhoneIcon className="w-5 h-5 text-gray-400" />
              <span>{user.phone}</span>
            </li>
          )}
          {user.website && (
            <li className="flex items-center space-x-2 text-gray-700">
              <LinkIcon className="w-5 h-5 text-gray-400" />
              <span>{user.website}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
