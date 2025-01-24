export async function getWebflowSites(
  destination: boolean = false
): Promise<string> {
  const apiKey = destination
    ? process.env.DESTINATION_KEY
    : process.env.SOURCE_KEY;

  const url = `https://api.webflow.com/v2/sites`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const site = data.sites[0];
    return site.id;
  } catch (error) {
    throw error;
  }
}
