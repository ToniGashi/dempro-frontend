import React from "react";
import { getFlaggedContent } from "@/lib/actions";
import type { FlaggedItem } from "@/lib/types";
import FlaggedContentClient from "./FlaggedContentPage";

export default async function FlaggedContentPage() {
  const data = await getFlaggedContent();
  const items: FlaggedItem[] = data.result ?? [];

  return <FlaggedContentClient items={items} />;
}
