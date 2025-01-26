import { localState } from "./local-state";
import { mainMenu } from "../..";
import { ui } from "../../ui";
import { handleCancel } from "../../utils/handle-cancel";
import { readKeyNames } from "../../utils/read-key-names";

export async function selectSites() {
  let sites = await readKeyNames();
  const siteOptions = sites.map((site) => ({ label: site, value: site }));

  const source = await ui.prompt.select({
    message: "Select source site",
    options: siteOptions,
  });
  await handleCancel(source, { destination: mainMenu });

  const destination = await ui.prompt.select({
    message: "Select destination site",
    options: siteOptions,
  });
  await handleCancel(destination, { destination: mainMenu });

  localState.source.keyName = source.toString();
  localState.destination.keyName = destination.toString();
}
