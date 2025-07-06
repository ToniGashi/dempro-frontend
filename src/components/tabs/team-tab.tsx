"use client";

import { updateRole } from "@/lib/actions";
import { TeamMember } from "@/lib/types";
import React, { useState, useEffect } from "react";

interface TeamListProps {
  team: TeamMember[];
}

export default function TeamTab({ team }: TeamListProps) {
  // local member list
  const [members, setMembers] = useState<TeamMember[]>(team);
  // track individual roles
  const [roles, setRoles] = useState<Record<string, string>>({});
  // invite form fields
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Viewer">("Viewer");

  // derive projectId from the first member
  const projectId = members[0]?.projectId;

  // sync incoming prop->state on mount/prop change
  useEffect(() => {
    setMembers(team);
    const map: Record<string, string> = {};
    team.forEach((m) => {
      map[m.userEmail] = m.teamRole;
    });
    setRoles(map);
  }, [team]);

  // role-change handler
  const handleRoleSelect = async (
    projectId: number,
    role: string,
    email: string
  ) => {
    try {
      const result = await updateRole({ projectId, role, email });
      if ("error" in result && result.error) {
        console.error("Update failed:", result.error);
        return;
      }
      setRoles((prev) => ({ ...prev, [email]: role }));
    } catch (err) {
      console.error("Network/server error:", err);
    }
  };

  // invite-user handler
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    try {
      const result = await updateRole({
        projectId,
        email: inviteEmail,
        role: inviteRole,
      });
      if ("error" in result && result.error) {
        console.error("Invite failed:", result.error);
        return;
      }
      // assume result.result is the new TeamMember
      // console.log(result, "invite result");
      // const newMember: TeamMember = result.result;
      // console.log(newMember, "added to team");
      // setMembers((prev) => [...prev, newMember]);
      // setRoles((prev) => ({
      //   ...prev,
      //   [newMember.userEmail]: newMember.teamRole,
      // }));
      setInviteEmail("");
    } catch (err) {
      console.error("Network/server error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Invite form */}
      <form onSubmit={handleInvite} className="flex items-center gap-2">
        <input
          type="email"
          required
          placeholder="user@example.com"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="border px-2 py-1 rounded-md flex-1"
        />
        <select
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value as any)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          disabled={!inviteEmail}
          className="bg-blue-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
        >
          Invite
        </button>
      </form>

      {/* Team table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Joined at", "Role"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((m) => (
              <tr key={m.userEmail}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {m.userName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {m.userEmail}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(m.invitedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  <select
                    value={roles[m.userEmail]}
                    onChange={(e) =>
                      handleRoleSelect(m.projectId, e.target.value, m.userEmail)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
