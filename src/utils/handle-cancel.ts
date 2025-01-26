import { ui } from "../ui";

/**
 * If user cancels a prompt, performs the appropriate action
 *
 * Can send a message, route to a destination function
 * If no destination is provided, will route to outro
 *
 * @param {any} source - The prompt source of the cancel action
 */
export async function handleCancel(source: any, args: CancelAction = {}) {
  try {
    if (ui.prompt.isCancel(source)) routeAction();

    async function routeAction() {
      if (args.message) ui.prompt.log.message(args.message);
      if (args.destination && typeof args.destination === "function") {
        await args.destination();
        process.exit(0);
      } else {
        ui.prompt.outro("See ya later! 👋");
        process.exit(0);
      }
    }
  } catch (error) {
    ui.prompt.log.error("Error handling cancel action.");
    process.exit(0);
  }
}

/**
 * @interface CancelAction
 *
 * @property {string} message - Message to display, optional
 * @property {() => void} destination - Function to call, optional. If not provided, will route to outro
 */
interface CancelAction {
  message?: string;
  destination?: () => void;
}
