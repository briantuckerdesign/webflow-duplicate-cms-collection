import { mainMenu } from "../..";
import { ui } from "../../ui";
import { createCollection } from "./create-collection";
import { createFields } from "./create-fields";

export async function duplicateCollection() {
  try {
    ui.prompt.log.info("🚀 Duplicating collection...");
    // create collection at destination
    await createCollection();
    // create fields at destination collection
    await createFields();

    ui.prompt.log.success("✅ Collection duplicated successfully!");
  } catch (error) {
    ui.prompt.log.error("❌ There was an error duplicating the collection");
    console.error(error);
    process.exit(0);
  }
}
