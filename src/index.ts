import { duplicateCollection } from "./duplicate-collection";
import { initConfig } from "./init-config";
import { selectCollection } from "./select-collection";
import { confirm } from "./utils/confirm";
import { ui } from "./utils/ui";
import type { Config } from "./types";

async function main() {
  try {
    ui.prompt.intro("Webflow Duplicate CMS Collection");
    ui.spinner.start("Loading...");
    // Get data from end points
    const config = await initConfig();
    ui.spinner.stop("Config loaded.");

    await duplicationFlow(config);
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
}

main();

async function duplicationFlow(config: Config) {
  // Select collection from source
  config.source.collectionDetails = await selectCollection(false, config);

  // Ask user to confirm
  await confirm(config);

  // Duplicate selected collection to destination
  await duplicateCollection(config);

  await confirm(config, "Do you want to duplicate another collection?");

  duplicationFlow(config);
}
