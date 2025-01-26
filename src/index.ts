/**
 * menu
 *   - copy collection (does not support reference at this time)
 *   - sync collections
 *   - publish site
 *   - delete all items
 *       - confirm
 */

import { tools } from "./tools";
import { ui } from "./ui";
import { handleCancel } from "./utils/handle-cancel";

export async function mainMenu() {
  try {
    const menu = await ui.prompt.select({
      message: "What would you like to do?",
      options: [
        { value: "copyCollection", label: "Copy collection" },
        { value: "syncCollections", label: "Sync collections" },
        { value: "publishSite", label: "Publish site" },
        { value: "deleteAllItems", label: "Delete all items" },
        { value: "exit", label: "Exit", hint: "Bye!" },
      ],
    });

    await handleCancel(menu);

    switch (menu) {
      case "copyCollection":
        await tools.copyCollection();
        break;
      // case "syncCollections":
      //   await tools.syncCollections();
      //   break;
      // case "publishSite":
      //   await tools.publishSite();
      //   break;
      // case "deleteAllItems":
      //   await tools.deleteAllItems();
      //   break;
      default:
        ui.prompt.outro("See ya later! 👋");
        process.exit(0);
    }
  } catch (error) {
    ui.prompt.log.error("Error running main menu.");
    process.exit(0);
  }
}

mainMenu();
