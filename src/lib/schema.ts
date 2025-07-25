import { z } from "zod";

const requiredString = (fieldName: string) =>
  z.string().min(1, { message: `${fieldName} is required` });

export const createProjectSchema = z.object({
  title: requiredString("Title"),
  subtitle: requiredString("Subtitle"),
  tags: z.array(z.string()),
  topic: requiredString("Topic"),
});

export const createProjectThreadSchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  projectId: z.coerce.number().nullable(),
  category: z.enum(["Question", "Discussion", "Advice"]),
});

export const signInUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: `Email is required` }),
  password: requiredString("Password"),
});

export const signUpUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: `Email is required` }),
  password: requiredString("Password"),
  firstName: requiredString("First Name"),
  lastName: requiredString("Last Name"),
});

export const flagThreadSchema = z.object({
  reason: z.string().min(1, "Please select a reason"),
  note: z.string().max(500, "Note is too long").optional(),
});
export const addCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

export const fileUploadSchema = z.object({
  uploads: z
    .array(
      z.object({
        file: z.instanceof(File),
        license: z.string().min(1, "Please select a license"),
      })
    )
    .min(1, "Please select at least one file"),
});

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["Admin", "Viewer"]),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  location: z.string().optional(),
  language: z.string().optional(),
  civicInterests: z.string().optional(),
  phone: z.string().optional(),
  affiliation: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type SignUpUser = z.infer<typeof signUpUserSchema>;
export type SignInUser = z.infer<typeof signInUserSchema>;
export type FlagThreadForm = z.infer<typeof flagThreadSchema>;
export type AddCommentForm = z.infer<typeof addCommentSchema>;
export type FileUploadForm = z.infer<typeof fileUploadSchema>;
export type InviteForm = z.infer<typeof inviteSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
