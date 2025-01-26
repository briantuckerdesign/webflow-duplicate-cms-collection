import { ui } from "../../ui";
import { localState } from "./local-state";

export async function getSourceCollectionDetails() {
  try {
    ui.spinner.start("⌛ Fetching collection details...");
    localState.source.collection =
      await localState.source.webflow.collections.get(
        localState.source.collection.id
      );
    ui.spinner.stop("✔︎ Collection details fetched");
  } catch (error) {
    ui.spinner.stop("❌ There was an error fetching collection details");
    console.error(error);
    process.exit(0);
  }
}
