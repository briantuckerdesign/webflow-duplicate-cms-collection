import { writeFile } from "fs/promises";

async function createEnvFile() {
  const content = `SOURCE_KEY=\nDESTINATION_KEY=`;
  try {
    await writeFile(".env", content);
    console.log(".env file created successfully");
  } catch (error) {
    console.error("Failed to create .env file:", error);
  }
}

createEnvFile();
