"use client";

import { updateRole } from "@/lib/actions";
import { TeamMember } from "@/lib/types";
import React, { useState, useEffect } from "react";

interface TeamListProps {
  team: TeamMember[];
}

export default function TeamTab({ team }: TeamListProps) {
  // local state to track edited roles before pushing up
  const [roles, setRoles] = useState<Record<string, string>>({});

  // initialize state from incoming team prop
  useEffect(() => {
    const map: Record<string, string> = {};
    team.forEach((m) => {
      map[m.userEmail] = m.teamRole;
    });
    setRoles(map);
  }, [team]);

  const handleRoleSelect = async (
    projectId: number,
    role: string,
    email: string
  ) => {
    try {
      const result = await updateRole({ projectId, role, email });
      // if your action returns an error field, bail out here:
      if ("error" in result && result.error) {
        console.error("Update failed:", result.error);
        return;
      }

      // otherwise it's successful—update local state
      setRoles((prev) => ({
        ...prev,
        [email]: role, // keep using projectId as the key
      }));
    } catch (err) {
      console.error("Network or server error:", err);
      // optionally show an error toast/alert here
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Joined at
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {team.map((member) => {
            return (
              <tr key={member.userEmail}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {member.userName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {member.userEmail}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(member.invitedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  <select
                    value={roles[member.userEmail]}
                    onChange={(e) =>
                      handleRoleSelect(
                        member.projectId,
                        e.target.value,
                        member.userEmail
                      )
                    }
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
