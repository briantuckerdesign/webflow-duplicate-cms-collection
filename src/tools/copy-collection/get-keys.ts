import { WebflowClient } from "webflow-api";
import { localState } from "./local-state";
import { ui } from "../../ui";

export async function getKeys() {
  try {
    const sourceKey = process.env[localState.source.keyName];
    localState.source.webflow = new WebflowClient({ accessToken: sourceKey });

    const destinationKey = process.env[localState.destination.keyName];
    localState.destination.webflow = new WebflowClient({
      accessToken: destinationKey,
    });
  } catch (error) {
    ui.prompt.log.error("❌ There was an error getting stored keys");
    console.error(error);
    process.exit(0);
  }
}
