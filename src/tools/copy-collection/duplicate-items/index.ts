import { ui } from "../../../ui";
import { localState } from "../local-state";
import { createItems } from "./create-items";
import { getSourceItems } from "./get-source-items";
import { publishItems } from "./publish-items";

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
