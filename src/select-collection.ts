import { getCollectionDetails } from "./get-collection-details";
import {
  type Config,
  type WebflowCollection,
  type WebflowCollectionDetails,
} from "./types";
import { encapsulateObjectForSelect } from "./utils/encapsulate-for-select";
import { ui } from "./utils/ui";

export async function selectCollection(
  destination: boolean = false,
  config: Config
) {
  let type = destination ? "destination" : "source";
  let collections = destination
    ? config.destination.collections
    : config.source.collections;
  let apiKey = destination ? config.destination.apiKey : config.source.apiKey;

  const webflowCollection = await ui.prompt.select({
    message: `Select ${type} collection`,
    options: encapsulateObjectForSelect(collections),
  });

  if (ui.prompt.isCancel(webflowCollection)) process.exit(0);

  return await getCollectionDetails(webflowCollection, apiKey);
}
