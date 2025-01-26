import { disclaimer } from "./disclaimer";
import { selectSites } from "./select-sites";
import { getKeys } from "./get-keys";
import { selectCollection } from "./select-collection";
import { confirmItemDuplication } from "./confirm-duplication";
import { duplicateCollection } from "./duplicate-collection";
import { ui } from "../../ui";
import { duplicateItems } from "./duplicate-items";
import { determineSlug } from "./determine-slug";
import { getSourceCollectionDetails } from "./get-source-collection-details";
import { mainMenu } from "../..";
import { getSites } from "./get-sites";
import { localState } from "./local-state";

/**
 * Where I left off:
 *
 * - I switched back to createItemLive, and it's giving me 404, which makes me think it's site id related, but could be wrong
 * - If switched back to createItem, it works to create items but not publish them, and I can't get publishing to work on those staged items.
 *
 * Main todos:
 * - TODO: Styling to separate tool start/stop
 * - TODO: Error handling assessment
 * - TODO: Fix slug issue
 *
 */

export async function copyCollection() {
  try {
    await disclaimer();

    await selectSites();

    await getKeys();

    await getSites();

    await selectCollection();

    await getSourceCollectionDetails();

    await determineSlug();

    await duplicateCollection();

    await confirmItemDuplication();

    await duplicateItems();

    ui.prompt.log.success("🥳 Collection copied!");

    await mainMenu();
  } catch (error) {
    ui.prompt.log.error("❌ There was an error duplicating the collection");
    console.error(error);
    process.exit(0);
  }
}
