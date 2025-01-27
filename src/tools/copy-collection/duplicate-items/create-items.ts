import type { CollectionItemList } from "webflow-api/api";
import { ui } from "../../../ui";
import { localState } from "../local-state";

export async function createItems() {
  try {
    ui.spinner.start("⌛ Duplicating items...");

    // strip items to just isArchived?, isDraft?, and fieldData
    localState.source.items.items = localState.source.items.items.map(
      (item) => {
        return {
          isArchived: item.isArchived,
          isDraft: item.isDraft,
          fieldData: item.fieldData,
        };
      }
    );
    localState.destination.items =
      (await localState.destination.webflow.collections.items.createItem(
        localState.destination.collection.id,
        localState.source.items
      )) as CollectionItemList;

    ui.spinner.stop("✔︎ Items duplicated");
  } catch (error) {
    ui.spinner.stop("❌ There was an error creating the items");
    console.error(error);
    process.exit(0);
  }
}
