import { ui } from "./ui";

export async function confirm(config: any, message?: string) {
  const prompt = message
    ? message
    : `Duplicate collection ${config.source.collectionDetails.displayName} to destination site?`;
  const shallWeContinue = await ui.prompt.confirm({
    message: prompt,
  });
  if (shallWeContinue === false || ui.prompt.isCancel(shallWeContinue)) {
    ui.prompt.outro("See you later!");
    process.exit(0);
  }
}
