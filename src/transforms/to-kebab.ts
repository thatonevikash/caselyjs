import fs from "fs";
import path from "path";
import { type CaseType } from "../types";

// -------------------------------------------------------------

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

// -------------------------------------------------------------

function pascalToKebab(targetPath: string): void {
  const parent = path.dirname(targetPath);
  const currentName = path.basename(targetPath);
  const newName = toKebabCase(currentName);
  const newPath = path.join(parent, newName);

  if (currentName === newName) {
    console.log(`✅ Already in kebab-case: ${currentName}`);
    return;
  }

  try {
    fs.renameSync(targetPath, newPath);
    console.log(`✨ Renamed Pascal → Kebab: ${currentName} ➝ ${newName}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Rename failed: ${message}`);
  }
}

// -------------------------------------------------------------

function camelToKebab(targetPath: string): void {
  const parent = path.dirname(targetPath);
  const currentName = path.basename(targetPath);
  const newName = toKebabCase(currentName);
  const newPath = path.join(parent, newName);

  if (currentName === newName) {
    console.log(`✅ Already in kebab-case: ${currentName}`);
    return;
  }

  try {
    fs.renameSync(targetPath, newPath);
    console.log(`✨ Renamed Camel → Kebab: ${currentName} ➝ ${newName}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Rename failed: ${message}`);
  }
}

// -------------------------------------------------------------

export function toKebab(
  targetPath: string,
  currentType: Partial<CaseType>,
): void {
  if (currentType === "pascal") {
    pascalToKebab(targetPath);
  } else if (currentType === "camel") {
    camelToKebab(targetPath);
  } else {
    console.log("⚠️ Unsupported case type passed.");
  }
}
