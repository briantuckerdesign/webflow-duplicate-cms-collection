import { localState } from "../local-state";
import { handleExistingSlug } from "./handle-existing-slug";
import { handleSameDestination } from "./handle-same-destination";

// TODO: this isn't working correctly
export async function determineSlug() {
  await handleSameDestination();
  await handleExistingSlug();

  // If slug wasn't assigned in the edge cases above, use the source slug
  if (!localState.destination.slug) {
    localState.destination.slug = localState.source.collection.slug;
  }
}
