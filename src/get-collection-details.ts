import type { WebflowCollection, WebflowCollectionDetails } from "./types";

export async function getCollectionDetails(
  webflowCollection: WebflowCollection,
  apiKey: string
): Promise<WebflowCollectionDetails> {
  const url = `https://api.webflow.com/v2/collections/${webflowCollection.id}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as WebflowCollectionDetails;
  } catch (error) {
    console.log("Error getting fields.");
    throw error;
  }
}
