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

/**
 * Where I left off:
 *
 * Main todos:
 * - TODO: Fix publishing issue, it gives 404 on very much existing items
 * - TODO: Fix slug issue
 *
 * V2:
 * - support for reference fields
 *        - concern: referenced item ids won't exist at target, match by slug/overwrite ids? wait maybe im not thinking right, reconsider
 *        - when failed, options: skip field, selct a different collection to copy, or cancel
 *                   - OR ask if they want to duplicate the referenced collection first?
 *        - is it possible to auto find the referenced collection, or do we need to prompt the user to select it?
 */

export async function copyCollection() {
  try {
    ui.prompt.log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");
    ui.prompt.log.success(`🔨 ${ui.format.bold("Copy Collection")}`);

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
    ui.prompt.log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");

    await mainMenu();
  } catch (error) {
    ui.prompt.log.error("❌ There was an error duplicating the collection");
    console.error(error);
    process.exit(0);
  }
}
