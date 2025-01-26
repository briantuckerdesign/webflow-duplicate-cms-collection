import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";

export async function disclaimer() {
  const disclaimer = await ui.prompt.confirm({
    message: "This does not support reference fields. Continue?",
  });
  handleCancel(disclaimer, { destination: mainMenu });
  if (!disclaimer) await mainMenu();
}
