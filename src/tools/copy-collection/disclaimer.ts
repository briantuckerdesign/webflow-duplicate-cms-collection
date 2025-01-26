import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";

// TODO: Cancelling here is causing a visual bug
export async function disclaimer() {
  try {
    ui.prompt.log.info("Important disclaimers:");
    ui.prompt.log.info(" - Reference fields are not supported at this time");
    ui.prompt.log.info(" - Field constraints are not copied");

    const disclaimer = await ui.prompt.confirm({
      message: "Continue?",
    });

    await handleCancel(disclaimer, { destination: mainMenu });
    if (!disclaimer) await mainMenu();
  } catch (error) {
    ui.prompt.log.error("❌ There was an error with the disclaimer");
    console.error(error);
    process.exit(0);
  }
}
