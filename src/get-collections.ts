import { type WebflowCollection } from "./types";

export async function getWebflowCollections(
  destination: boolean = false,
  siteId: string
): Promise<WebflowCollection[]> {
  const apiKey = destination
    ? process.env.DESTINATION_KEY
    : process.env.SOURCE_KEY;

  const url = `https://api.webflow.com/v2/sites/${siteId}/collections`;
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
    const data = await response.json();
    const collections = data.collections;

    return collections;
  } catch (error) {
    throw error;
  }
}
