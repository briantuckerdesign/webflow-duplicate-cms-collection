export function encapsulateObjectForSelect(objects) {
  if (!Array.isArray(objects)) {
    throw new TypeError("Input must be an array of objects");
  }

  return objects.map((object) => {
    if (typeof object !== "object" || object === null) {
      throw new TypeError("Each item in array should be an object");
    }

    return {
      label: object.name || object.displayName,
      value: { ...object },
    };
  });
}
