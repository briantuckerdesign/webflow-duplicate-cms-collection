import type { Config, WebflowCollectionDetails } from "./types";

export async function createCollection(
  config: Config
): Promise<WebflowCollectionDetails> {
  try {
    const url = `https://api.webflow.com/v2/sites/${config.destination.siteId}/collections`;
    const body = {
      displayName: config.source.collectionDetails.displayName,
      singularName: config.source.collectionDetails.singularName,
      slug: config.source.collectionDetails.slug,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${config.destination.apiKey}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    if (response && response.status === 200) return response.json();
  } catch (error) {
    throw error;
  }
}
