import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";
import { localState } from "./local-state";

export async function confirmItemDuplication() {
  try {
    const copyItems = await ui.prompt.confirm({
      message: "Duplicate items too?",
    });
    await handleCancel(copyItems, { destination: mainMenu });

    if (copyItems) localState.duplicateItems = true;
  } catch (error) {
    ui.prompt.log.error("❌ There was an error confirming item duplication");
    console.error(error);
    process.exit(0);
  }
}
