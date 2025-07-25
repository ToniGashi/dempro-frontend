"use client";

import React, { useCallback, useState } from "react";
import { updateUser } from "@/lib/actions";

import { Form } from "@/components/ui/form";
import {
  FormFieldInput,
  FormFieldTextArea,
} from "@/components/custom-form-fields";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ProfileForm, profileSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  X,
  Save,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
} from "lucide-react";
import { UserProfile } from "@/lib/types";

const InfoField = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) => (
  <div className="flex items-start gap-3 py-2">
    <Icon className="h-5 w-5 text-dpro-primary mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-medium text-dpro-dark">{label}</p>
      <p className="text-dpro-gray">{value || "Not specified"}</p>
    </div>
  </div>
);

export function Profile({ profile }: { profile?: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
      countryOfOrigin: profile?.countryOfOrigin || "",
      location: profile?.location || "",
      language: profile?.language || "",
      civicInterests: profile?.civicInterests || "",
      phone: profile?.phone || "",
      affiliation: profile?.affiliation || "",
      website: profile?.website || "",
    },
  });

  const handleSubmit = useCallback(async (values: ProfileForm) => {
    setIsSubmitting(true);
    try {
      toast.promise(
        (async () => {
          const result = await updateUser(values);
          if (!result.success) {
            throw new Error(result.error || "Failed to update profile");
          }
          setIsEditing(false);
        })(),
        {
          loading: "Updating profile...",
          success: "Profile updated successfully!",
          error: (err) => `Failed to update profile: ${err.message}`,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleCancel = () => {
    form.reset({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
      countryOfOrigin: profile?.countryOfOrigin || "",
      location: profile?.location || "",
      language: profile?.language || "",
      civicInterests: profile?.civicInterests || "",
      phone: profile?.phone || "",
      affiliation: profile?.affiliation || "",
      website: profile?.website || "",
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-dpro-light-gray">
          <CardHeader className="bg-dpro-primary !items-center p-7">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-2xl">
                <Pencil className="h-5 w-5" />
                Edit Profile
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="text-white hover:bg-dpro-secondary hover:cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldInput
                    name="firstName"
                    form={form}
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                  <FormFieldInput
                    name="lastName"
                    form={form}
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                </div>

                <FormFieldInput
                  name="email"
                  form={form}
                  label="Email"
                  disabled
                  placeholder="Enter your email"
                  type="email"
                />

                <FormFieldTextArea
                  name="bio"
                  form={form}
                  label="Bio"
                  placeholder="Tell us about yourself..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldInput
                    name="location"
                    form={form}
                    label="Location"
                    placeholder="Enter your location"
                  />
                  <FormFieldInput
                    name="countryOfOrigin"
                    form={form}
                    label="Country of Origin"
                    placeholder="Enter your country"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldInput
                    name="language"
                    form={form}
                    label="Language"
                    placeholder="Enter preferred language"
                  />
                  <FormFieldInput
                    name="phone"
                    form={form}
                    label="Phone"
                    placeholder="Enter your phone number"
                    type="tel"
                  />
                </div>

                <FormFieldInput
                  name="affiliation"
                  form={form}
                  label="Affiliation"
                  placeholder="Enter your affiliation"
                />

                <FormFieldInput
                  name="website"
                  form={form}
                  label="Website"
                  placeholder="https://yourwebsite.com"
                  type="url"
                />

                <FormFieldTextArea
                  name="civicInterests"
                  form={form}
                  label="Civic Interests"
                  placeholder="Describe your civic interests..."
                />

                <div className="flex gap-3 justify-end pt-4 border-t border-dpro-light-gray">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-dpro-primary text-white hover:bg-dpro-dark"
                  >
                    {isSubmitting ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="border-dpro-light-gray">
        <CardHeader className="bg-dpro-primary !items-center p-5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white text-2xl">
                {profile?.fullName}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="secondary"
                  className="bg-dpro-accent text-white"
                >
                  {profile?.role}
                </Badge>
                {profile?.isActivated && (
                  <Badge
                    variant="outline"
                    className="border-dpro-dark-green text-white bg-dpro-dark-green"
                  >
                    Active
                  </Badge>
                )}
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-dpro-accent text-white hover:bg-dpro-dark hover:cursor-pointer"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-dpro-dark mb-4">
                Basic Information
              </h3>
              <div className="space-y-1">
                <InfoField
                  icon={User}
                  label="Full Name"
                  value={profile?.fullName}
                />
                <InfoField icon={Mail} label="Email" value={profile?.email} />
                <InfoField icon={Phone} label="Phone" value={profile?.phone} />
                <InfoField
                  icon={Globe}
                  label="Website"
                  value={profile?.website}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-dpro-dark mb-4">
                Location & Background
              </h3>
              <div className="space-y-1">
                <InfoField
                  icon={MapPin}
                  label="Location"
                  value={profile?.location}
                />
                <InfoField
                  icon={Globe}
                  label="Country of Origin"
                  value={profile?.countryOfOrigin}
                />
                <InfoField
                  icon={User}
                  label="Language"
                  value={profile?.language}
                />
                <InfoField
                  icon={User}
                  label="Affiliation"
                  value={profile?.affiliation}
                />
              </div>
            </div>
          </div>

          {profile && profile.bio && (
            <>
              <Separator className="my-6 bg-dpro-light-gray" />
              <div>
                <h3 className="text-lg font-semibold text-dpro-dark mb-3">
                  Bio
                </h3>
                <p className="text-dpro-gray leading-relaxed">{profile.bio}</p>
              </div>
            </>
          )}

          {profile && profile.civicInterests && (
            <>
              <Separator className="my-6 bg-dpro-light-gray" />
              <div>
                <h3 className="text-lg font-semibold text-dpro-dark mb-3">
                  Civic Interests
                </h3>
                <p className="text-dpro-gray leading-relaxed">
                  {profile?.civicInterests}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
