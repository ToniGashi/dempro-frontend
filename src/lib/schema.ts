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

export type SignUpUser = z.infer<typeof signUpUserSchema>;
export type SignInUser = z.infer<typeof signInUserSchema>;
export type FlagThreadForm = z.infer<typeof flagThreadSchema>;
