import { ui } from "../../../ui";
import { localState } from "../local-state";

export async function createCollection() {
  try {
    ui.spinner.start("⌛ Creating collection at destination...");
    localState.destination.collection =
      await localState.destination.webflow.collections.create(
        localState.destination.site.id,
        {
          displayName: localState.source.collection.displayName,
          singularName: localState.source.collection.singularName,
          slug: localState.destination.slug,
        }
      );
    ui.spinner.stop("✔︎ Collection created at destination");
  } catch (error) {
    ui.spinner.stop("❌ There was an error creating the collection");
    console.error(error);
    process.exit(0);
  }
}
