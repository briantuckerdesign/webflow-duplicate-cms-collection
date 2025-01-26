import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";
import { parseForSelect } from "../../utils/parse-for-select";
import { localState } from "./local-state";

export async function getSites() {
  await getSourceSite();
  await getDestinationSite();
}

async function getSourceSite() {
  try {
    ui.spinner.start("⌛ Fetching source site ...");
    const sitesSource = await localState.source.webflow.sites.list();

    // if more than one, call sitePicker function
    if (sitesSource.sites.length > 1) {
      await sitePicker(true);
    } else {
      localState.source.site = sitesSource.sites[0];
    }
    ui.spinner.stop("✔︎ Source site fetched");
  } catch (error) {
    ui.spinner.stop("❌ There was an error fetching the source site");
    console.error(error);
    process.exit(0);
  }
}

async function getDestinationSite() {
  try {
    ui.spinner.start("⌛ Fetching destination site...");
    const sitesDestination = await localState.destination.webflow.sites.list();

    if (sitesDestination.sites.length > 1) {
      await sitePicker(true);
    } else {
      localState.destination.site = sitesDestination.sites[0];
    }
    ui.spinner.stop("✔︎ Destination site fetched");
  } catch (error) {
    ui.spinner.stop("❌ There was an error fetching the destination site");
    console.error(error);
    process.exit(0);
  }
}

async function sitePicker(source = true) {
  const type = source ? "source" : "destination";
  try {
    const site = await ui.prompt.select({
      message: `Select ${type} site`,
      options: parseForSelect(localState[type].site),
    });
    await handleCancel(site, { destination: mainMenu });

    localState[type].site = site;
  } catch (error) {
    ui.spinner.stop("❌ There was an error fetching the source site");
    console.error(error);
    process.exit(0);
  }
}
