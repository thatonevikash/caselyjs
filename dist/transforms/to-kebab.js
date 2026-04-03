"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKebab = toKebab;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function toKebabCase(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}
function pascalToKebab(targetPath) {
    const parent = path_1.default.dirname(targetPath);
    const currentName = path_1.default.basename(targetPath);
    const newName = toKebabCase(currentName);
    const newPath = path_1.default.join(parent, newName);
    if (currentName === newName) {
        console.log(`✅ Already in kebab-case: ${currentName}`);
        return;
    }
    try {
        fs_1.default.renameSync(targetPath, newPath);
        console.log(`✨ Renamed Pascal → Kebab: ${currentName} ➝ ${newName}`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Rename failed: ${message}`);
    }
}
function camelToKebab(targetPath) {
    const parent = path_1.default.dirname(targetPath);
    const currentName = path_1.default.basename(targetPath);
    const newName = toKebabCase(currentName);
    const newPath = path_1.default.join(parent, newName);
    if (currentName === newName) {
        console.log(`✅ Already in kebab-case: ${currentName}`);
        return;
    }
    try {
        fs_1.default.renameSync(targetPath, newPath);
        console.log(`✨ Renamed Camel → Kebab: ${currentName} ➝ ${newName}`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Rename failed: ${message}`);
    }
}
function toKebab(targetPath, currentType) {
    if (currentType === "pascal") {
        pascalToKebab(targetPath);
    }
    else if (currentType === "camel") {
        camelToKebab(targetPath);
    }
    else {
        console.log("⚠️ Unsupported case type passed.");
    }
}
//# sourceMappingURL=to-kebab.js.map