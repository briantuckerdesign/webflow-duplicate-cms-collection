import format from "picocolors";
import * as prompt from "@clack/prompts";

export const ui = {
  prompt, // via clack
  format, // via picocolors
  spinner: prompt.spinner(), //via clack
  presets: {
    webflow,
    airtable,
    utilityField,
  },
};

function webflow(message: string) {
  return format.bgBlue(format.white(format.bold(message)));
}
function airtable(message: string) {
  return format.bgMagenta(format.bold(format.white(message)));
}
function utilityField(message: string) {
  return format.green(format.bold(format.underline(message)));
}
