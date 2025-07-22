"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateRole } from "@/lib/actions";
import { TeamMember } from "@/lib/types";
import { InviteForm, inviteSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormFieldInput,
  FormFieldSelect,
} from "@/components/custom-form-fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/hooks/use-auth";

interface TeamListProps {
  team: TeamMember[];
}

export default function TeamTab({ team }: TeamListProps) {
  const { user } = useAuth();
  const inviteForm = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "", role: "Viewer" },
  });

  const [roleLoading, setRoleLoading] = useState<Record<string, boolean>>({});
  const hasInvitePermission = team
    .filter((item) => item.teamRole === "Admin")
    .find((item) => item.userEmail === user?.email);

  const onInvite = async (values: InviteForm) => {
    const projectId = team[0]?.projectId;

    if (!projectId) return;
    try {
      toast.promise(
        (async () => {
          const result = await updateRole({
            projectId,
            email: values.email,
            role: values.role,
          });
          if (!result || !("success" in result) || !result.success) {
            throw new Error((result as any)?.error || "Failed to invite user");
          }
          return result;
        })(),
        {
          loading: "Inviting user...",
          success: () => {
            inviteForm.reset();
            return "User invited!";
          },
          error: (err) => `Something went wrong: ${err.message}`,
        }
      );
    } catch (error) {
      console.error("Error inviting user:", error);
      toast.error("Failed to invite user. Please try again.");
    }
  };

  const handleRoleChange = async (
    projectId: number,
    email: string,
    role: "Admin" | "Viewer"
  ) => {
    setRoleLoading((prev) => ({ ...prev, [email]: true }));
    try {
      toast.promise(
        (async () => {
          const result = await updateRole({ projectId, email, role });
          if (!result || !("success" in result) || !result.success) {
            throw new Error((result as any)?.error || "Failed to update role");
          }
          return result;
        })(),
        {
          loading: "Updating role...",
          success: () => {
            inviteForm.reset();
            return "Role updated!";
          },
          error: (err) => `Something went wrong: ${err.message}`,
        }
      );
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role. Please try again.");
    } finally {
      setRoleLoading((prev) => ({ ...prev, [email]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {hasInvitePermission && (
        <Form {...inviteForm}>
          <form
            onSubmit={inviteForm.handleSubmit(onInvite)}
            className="sm:flex-row flex flex-col items-center gap-2"
          >
            <FormFieldInput
              name="email"
              form={inviteForm}
              placeholder="user@example.com"
              type="email"
              className="rounded-md flex-1"
            />
            <div className="flex gap-4">
              <FormFieldSelect
                name="role"
                form={inviteForm}
                options={[
                  { value: "Viewer", label: "Viewer" },
                  { value: "Admin", label: "Admin" },
                ]}
              />
              <Button
                type="submit"
                disabled={
                  !inviteForm.formState.isValid ||
                  inviteForm.formState.isSubmitting
                }
              >
                Invite
              </Button>
            </div>
          </form>
        </Form>
      )}

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
            {team.map((m) => (
              <tr key={m.userEmail}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {m.userName.replace(/\b\w/g, (c) => c.toUpperCase())}
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
                  <Select
                    value={m.teamRole}
                    disabled={roleLoading[m.userEmail]}
                    onValueChange={(e) =>
                      handleRoleChange(
                        m.projectId,
                        m.userEmail,
                        e as "Admin" | "Viewer"
                      )
                    }
                  >
                    <SelectTrigger className="w-[100px] text-md py-2 pl-4 pr-2 text-gray-700 bg-white border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1">
                      <SelectValue
                        placeholder="Select role..."
                        className="max-w-[80px]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
