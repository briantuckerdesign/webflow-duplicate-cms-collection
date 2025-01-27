import { ui } from "../../../ui";
import { localState } from "../local-state";

export async function publishItems() {
  try {
    ui.spinner.start("⌛ Publishing items...");
    // delay 1 second
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // remove items with isDraft or isArchived
    // const filteredItems = localState.destination.items.items.filter(
    //   (item) => !item.isArchived && !item.isDraft
    // );

    const filteredItemIds = ["679646554596857ef81acd45"];
    // const filteredItemIds = filteredItems.map((item) => item.id);
    // console.log("📣 - publishItems - filteredItemIds:", filteredItemIds);

    const response =
      await localState.destination.webflow.collections.items.publishItem(
        "67964652e9f916754cc65906",
        // localState.destination.collection.id,
        { itemIds: filteredItemIds }
      );

    const published = response.publishedItemIds.length;
    const failed = response.errors.length;
    const total = filteredItemIds.length;

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
