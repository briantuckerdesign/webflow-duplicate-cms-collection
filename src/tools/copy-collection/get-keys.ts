import { WebflowClient } from "webflow-api";
import { localState } from "./local-state";

export async function getKeys() {
  const sourceKey = process.env[localState.source.keyName];
  localState.source.webflow = new WebflowClient({ accessToken: sourceKey });

  const destinationKey = process.env[localState.destination.keyName];
  localState.destination.webflow = new WebflowClient({
    accessToken: destinationKey,
  });
}
