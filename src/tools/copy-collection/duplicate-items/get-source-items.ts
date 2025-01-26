import { ui } from "../../../ui";
import { localState } from "../local-state";

export async function getSourceItems() {
  try {
    ui.spinner.start("⌛ Getting source items...");
    localState.source.items =
      await localState.source.webflow.collections.items.listItems(
        localState.source.collection.id
      );
    ui.spinner.stop("✔︎ Source items fetched");
  } catch (error) {
    ui.spinner.stop("❌ There was an error getting the source items");
    console.error(error);
    process.exit(0);
  }
}
