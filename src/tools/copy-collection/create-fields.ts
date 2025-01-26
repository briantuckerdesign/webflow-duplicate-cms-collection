import type { Field } from "webflow-api/api";
import { ui } from "../../ui";
import { localState } from "./local-state";

export async function createFields() {
  try {
    ui.spinner.start("⌛ Copying fields...");

    const fields = localState.source.collection.fields;

    for (const field of fields) {
      // Skipping name and slug fields because they will already exist
      if (field.slug === "name" || field.slug === "slug") continue;

      // Skipping reference fields because it's not supported yet
      // Webflow's typing excludes these field types for some reason
      // @ts-ignore
      if (field.type === "Reference") continue;
      // @ts-ignore
      if (field.type === "MultiReference") continue;

      const fieldData = {
        displayName: field.displayName,
        type: field.type,
      } as Field;

      if (field.isRequired) fieldData.isRequired = field.isRequired;
      if (field.helpText) fieldData.helpText = field.helpText;

      await localState.destination.webflow.collections.fields.create(
        localState.destination.collection.id,
        fieldData
      );
    }
    ui.spinner.stop("✔︎ Fields copied");
  } catch (error) {
    ui.spinner.stop("❌ There was an error creating the fields");
    console.error(error);
    process.exit(0);
  }
}
