"use server";

import { revalidateTag } from "next/cache";
import { createApiOperation, createReadOperation } from "./api-helpers";

// =============================================
// Project Operations
// =============================================

export const getProject = createReadOperation<string, any>({
  url: (id) => `project/${id}`,
  tags: ["project"],
});
