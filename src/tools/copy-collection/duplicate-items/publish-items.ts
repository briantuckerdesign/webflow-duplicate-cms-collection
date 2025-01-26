import { ui } from "../../../ui";
import { localState } from "../local-state";

export async function publishItems() {
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
