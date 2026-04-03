"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascal = toPascal;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function toPascalCase(str) {
    return str
        .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
        .replace(/^(.)/, (_, group1) => group1.toUpperCase());
}
function kebabToPascal(targetPath) {
    const parent = path_1.default.dirname(targetPath);
    const currentName = path_1.default.basename(targetPath);
    const newName = toPascalCase(currentName);
    const newPath = path_1.default.join(parent, newName);
    if (currentName === newName) {
        console.log(`✅ Already in PascalCase: ${currentName}`);
        return;
    }
    try {
        fs_1.default.renameSync(targetPath, newPath);
        console.log(`✨ Renamed Kebab → Pascal: ${currentName} ➝ ${newName}`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Rename failed: ${message}`);
    }
}
function camelToPascal(targetPath) {
    const parent = path_1.default.dirname(targetPath);
    const currentName = path_1.default.basename(targetPath);
    const newName = currentName.charAt(0).toUpperCase() + currentName.slice(1);
    const newPath = path_1.default.join(parent, newName);
    if (currentName === newName) {
        console.log(`✅ Already in PascalCase: ${currentName}`);
        return;
    }
    try {
        fs_1.default.renameSync(targetPath, newPath);
        console.log(`✨ Renamed Camel → Pascal: ${currentName} ➝ ${newName}`);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Rename failed: ${message}`);
    }
}
function toPascal(targetPath, currentType) {
    if (currentType === "kebab") {
        kebabToPascal(targetPath);
    }
    else if (currentType === "camel") {
        camelToPascal(targetPath);
    }
    else {
        console.log("⚠️ Unsupported case type passed.");
    }
}
//# sourceMappingURL=to-pascal.js.map