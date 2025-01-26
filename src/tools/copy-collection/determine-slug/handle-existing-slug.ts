import { ui } from "../../../ui";
import { localState } from "../local-state";

// Check if collection slug already exists if not
export async function handleExistingSlug() {
  const collectionSlug =
    localState.destination.slug || localState.source.collection.slug;

  try {
    ui.spinner.start("⌛ Checking if collection slug already exists...");
    const collections = await localState.destination.webflow.collections.list(
      localState.destination.site.id
    );
    ui.spinner.stop("✔︎ Collections checked");

    if (
      collections.collections.find(
        (collection) => collection.slug === collectionSlug
      )
    ) {
      const destinationSlug = await ui.prompt.text({
        message:
          "Collection slug already exists. Provide a unique slug for the new collection:",
        initialValue: `${collectionSlug}-copy`,
        validate(value) {
          if (value.length === 0) return `Value is required!`;
          if (/[^a-zA-Z0-9-_]/.test(value)) {
            return `Only alphanumeric characters, dashes, and underscores are allowed`;
          }
        },
      });
      localState.destination.slug = destinationSlug.toString();
    }
  } catch (error) {
    ui.spinner.stop(
      "❌ There was an error checking if collection slug already exists"
    );
    console.error(error);
    process.exit(0);
  }
}
