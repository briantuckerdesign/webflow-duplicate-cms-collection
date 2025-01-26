import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";
import { localState } from "./local-state";

export async function confirmItemDuplication() {
  const copyItems = await ui.prompt.confirm({
    message: "Duplicate items too?",
  });
  await handleCancel(copyItems, { destination: mainMenu });

  if (copyItems) localState.duplicateItems = true;
}
