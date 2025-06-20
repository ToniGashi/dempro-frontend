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
  projectId: z.coerce.number(),
  category: z.enum(["Question", "Discussion", "Advice"]),
});
