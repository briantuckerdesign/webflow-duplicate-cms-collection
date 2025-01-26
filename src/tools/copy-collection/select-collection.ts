import { localState } from "./local-state";
import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";
import { parseForSelect } from "../../utils/parse-for-select";
import type { Collection } from "webflow-api/api";

export async function selectCollection() {
  try {
    ui.spinner.start("⌛ Fetching collections...");
    const collections = await localState.source.webflow.collections.list(
      localState.source.site.id
    );
    ui.spinner.stop("✔︎ Collections fetched");

    const collection = (await ui.prompt.select({
      message: "Select collection",
      options: parseForSelect(collections.collections),
    })) as Collection;
    await handleCancel(collection, { destination: mainMenu });

    localState.source.collection = collection;
  } catch (error) {
    ui.spinner.stop("❌ There was an error fetching the collections");
    console.error(error);
    process.exit(0);
  }
}
