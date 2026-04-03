import { toCamel } from "../transforms/to-camel.js";
import { toKebab } from "../transforms/to-kebab.js";
import { toPascal } from "../transforms/to-pascal.js";
import { CaseType } from "../types.js";

// -------------------------------------------------------------

export async function mutateCase(
  path: string,
  currentType: Exclude<CaseType, "unknown">,
  expectedType: Exclude<CaseType, "unknown">,
): Promise<void> {
  if (expectedType === "camel") {
    toCamel(path, currentType);
  }

  if (expectedType === "kebab") {
    toKebab(path, currentType);
  }

  if (expectedType === "pascal") {
    toPascal(path, currentType);
  }
}
