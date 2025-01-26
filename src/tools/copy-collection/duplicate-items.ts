import type { CollectionItemList } from "webflow-api/api";
import { ui } from "../../ui";
import { localState } from "./local-state";

export async function duplicateItems() {
  if (!localState.duplicateItems) return;

  try {
    ui.prompt.log.info("📦 Duplicating items...");

    await getSourceItems();

    await createItems();

    await publishItems();
  } catch (error) {
    ui.prompt.log.error("❌ There was an error duplicating the items");
    console.error(error);
    process.exit(0);
  }
}

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

async function createItems() {
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
      (await localState.destination.webflow.collections.items.createItemLive(
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

async function publishItems() {
  try {
    ui.spinner.start("⌛ Publishing items...");
    // delay 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // remove items with isDraft or isArchived
    const filteredItems = localState.destination.items.items.filter(
      (item) => !item.isArchived && !item.isDraft
    );

    const itemIds = filteredItems.map((item) => item.id);

    const response =
      await localState.destination.webflow.collections.items.publishItem(
        localState.destination.collection.id,
        { itemIds }
      );

    const published = response.publishedItemIds.length;
    const failed = response.errors.length;
    const total = itemIds.length;

    if (failed) {
      ui.prompt.log.error("❌ Some items failed to publish");
      ui.prompt.log.info(`${published - failed}/${total} items published`);
    }

    ui.spinner.stop("✔︎ Items published");
  } catch (error) {
    ui.spinner.stop("❌ There was an error publishing the items");
    console.error(error);
    process.exit(0);
  }
}
