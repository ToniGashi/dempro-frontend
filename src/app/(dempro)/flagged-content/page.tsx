import { getFlaggedContent } from "@/lib/actions";
import FlaggedContentClient from "./FlaggedContentPage";

export default async function FlaggedContentPage() {
  const { result: flaggedThreads } = await getFlaggedContent();

  return <FlaggedContentClient items={flaggedThreads ?? []} />;
}
