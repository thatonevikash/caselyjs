import fs from "fs";
import path from "path";
import { type CaseType } from "../types";

// -------------------------------------------------------------

function toCamelCase(str: string): string {
  return str
    .replace(/[-_](.)/g, (_, group1: string) => group1.toUpperCase())
    .replace(/^(.)/, (_, group1: string) => group1.toLowerCase());
}

// -------------------------------------------------------------

function kebabToCamel(targetPath: string): void {
  const parent = path.dirname(targetPath);
  const currentName = path.basename(targetPath);
  const newName = toCamelCase(currentName);
  const newPath = path.join(parent, newName);

  if (currentName === newName) {
    console.log(`✅ Already in camelCase: ${currentName}`);
    return;
  }

  try {
    fs.renameSync(targetPath, newPath);
    console.log(`✨ Renamed Kebab → Camel: ${currentName} ➝ ${newName}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Rename failed: ${message}`);
  }
}

// -------------------------------------------------------------

function pascalToCamel(targetPath: string): void {
  const parent = path.dirname(targetPath);
  const currentName = path.basename(targetPath);
  const newName = currentName.charAt(0).toLowerCase() + currentName.slice(1);
  const newPath = path.join(parent, newName);

  if (currentName === newName) {
    console.log(`✅ Already in camelCase: ${currentName}`);
    return;
  }

  try {
    fs.renameSync(targetPath, newPath);
    console.log(`✨ Renamed Pascal → Camel: ${currentName} ➝ ${newName}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Rename failed: ${message}`);
  }
}

// -------------------------------------------------------------

export function toCamel(
  targetPath: string,
  currentType: Partial<CaseType>,
): void {
  if (currentType === "kebab") {
    kebabToCamel(targetPath);
  } else if (currentType === "pascal") {
    pascalToCamel(targetPath);
  } else {
    console.log("⚠️ Unsupported case type passed.");
  }
}
