// Function to read and extract keys from .env file
export async function readKeyNames(): Promise<string[]> {
  const file = Bun.file("./.env");
  if (!file.exists) return;

  const content = await file.text();

  // Extract the key from each line and filter out empty lines or comments
  const lines = content.split("\n");
  const keys = lines
    .map((line) => {
      const [key] = line.split("=");
      return key.trim();
    })
    .filter((key) => key && !key.startsWith("#"));

  return keys;
}
