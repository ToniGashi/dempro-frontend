"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { acceptProjectInvitation } from "@/lib/actions";
import { useAuth } from "@/hooks/use-auth";

export default function ProjectInvitationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const handleInvitation = async () => {
      const projectId = searchParams.get("projectId");

      if (!projectId) {
        router.replace("/");
        return;
      }

      try {
        const response = await acceptProjectInvitation(projectId);
        if (response.success) {
          if (user) {
            // User is authenticated, redirect to the project
            router.replace(`/projects/${projectId}`);
          } else {
            const returnUrl = `/projects/${projectId}`;
            router.replace(
              `/signin?returnUrl=${encodeURIComponent(returnUrl)}`
            );
          }
        } else {
          router.replace(`/`);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        const returnUrl = `/projects/${projectId}`;
        router.replace(`/signin?returnUrl=${encodeURIComponent(returnUrl)}`);
      } finally {
        setIsLoading(false);
      }
    };

    handleInvitation();
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-dpro-accent">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-dpro-secondary">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-dpro-primary rounded-full shadow-lg animate-pulse">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Processing Invitation
            </h1>
            <p className="mt-2 text-gray-600">
              Please wait while we process your project invitation...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
