import { createCollection } from "./create-collection";
import { createField } from "./create-field";
import { getCollectionDetails } from "./get-collection-details";
import type { WebflowCollectionDetails, Config } from "./types";
import { ui } from "./utils/ui";

export async function duplicateCollection(config: Config) {
  ui.spinner.start("Duplicating collection...");
  config.destination.collectionDetails = await createCollection(config);

  await createFields(config);
  const updatedCollectionDetails = await getCollectionDetails(
    config.destination.collectionDetails,
    config.destination.apiKey
  );
  ui.spinner.stop("Collection duplicated successfully!");
}

async function createFields(config: Config) {
  const fields = config.source.collectionDetails.fields;
  for (const field of fields) {
    if (field.slug === "name" || field.slug === "slug") continue;
    await createField(config, field);
  }
}
