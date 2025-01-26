import { ui } from "../../../ui";
import { localState } from "../local-state";

export async function handleSameDestination() {
  if (localState.source.keyName === localState.destination.keyName) {
    const collectionSlug = localState.source.collection.slug;
    const destinationSlug = await ui.prompt.text({
      message: "Provide a unique slug for the new collection:",
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
}
