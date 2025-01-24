import { getWebflowCollections } from "./get-collections";
import { getWebflowSites } from "./get-site-id";
import { type Config } from "./types";

export async function initConfig(): Promise<Config> {
  try {
    const sourceKey = process.env.SOURCE_KEY;
    const destKey = process.env.DESTINATION_KEY;

    const sourceSiteId = await getWebflowSites();
    const destSiteId = await getWebflowSites(true);

    const sourceCollections = await getWebflowCollections(false, sourceSiteId);
    const destCollections = await getWebflowCollections(true, destSiteId);

    return {
      source: {
        apiKey: sourceKey,
        siteId: sourceSiteId,
        collections: sourceCollections,
        collectionDetails: undefined,
      },
      destination: {
        apiKey: destKey,
        siteId: destSiteId,
        collections: destCollections,
        collectionDetails: undefined,
      },
    };
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
}
