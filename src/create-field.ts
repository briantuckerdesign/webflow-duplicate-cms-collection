import type { Config, WebflowField } from "./types";

/**
 * Creates field in given collection
 *
 * Documentation:
 * https://developers.webflow.com/data/reference/cms/collection-fields/create
 */
export async function createField(
  config: Config,
  field: WebflowField
): Promise<WebflowField> {
  try {
    const url = `https://api.webflow.com/v2/collections/${config.destination.collectionDetails.id}/fields`;
    const body = {
      type: field.type,
      displayName: field.displayName,
      isRequired: field.isRequired || false,
      helpText: field.helpText || "",
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
