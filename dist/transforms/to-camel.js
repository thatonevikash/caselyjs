"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamel = toCamel;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function toCamelCase(str) {
    return str
        .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
        .replace(/^(.)/, (_, group1) => group1.toLowerCase());
}
function kebabToCamel(targetPath) {
    const parent = path_1.default.dirname(targetPath);
    const currentName = path_1.default.basename(targetPath);
    const newName = toCamelCase(currentName);
    const newPath = path_1.default.join(parent, newName);
    if (currentName === newName) {
        console.log(`✅ Already in camelCase: ${currentName}`);
        return;
    }
    try {
        fs_1.default.renameSync(targetPath, newPath);
        console.log(`✨ Renamed Kebab → Camel: ${currentName} ➝ ${newName}`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Rename failed: ${message}`);
    }
}
function pascalToCamel(targetPath) {
    const parent = path_1.default.dirname(targetPath);
    const currentName = path_1.default.basename(targetPath);
    const newName = currentName.charAt(0).toLowerCase() + currentName.slice(1);
    const newPath = path_1.default.join(parent, newName);
    if (currentName === newName) {
        console.log(`✅ Already in camelCase: ${currentName}`);
        return;
    }
    try {
        fs_1.default.renameSync(targetPath, newPath);
        console.log(`✨ Renamed Pascal → Camel: ${currentName} ➝ ${newName}`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Rename failed: ${message}`);
    }
}
function toCamel(targetPath, currentType) {
    if (currentType === "kebab") {
        kebabToCamel(targetPath);
    }
    else if (currentType === "pascal") {
        pascalToCamel(targetPath);
    }
    else {
        console.log("⚠️ Unsupported case type passed.");
    }
}
//# sourceMappingURL=to-camel.js.map