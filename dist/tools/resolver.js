"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathResolver = pathResolver;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function pathResolver(targetPath, options = {}) {
    const { recursive = false } = options;
    const result = {
        files: [],
        folders: [],
    };
    function scan(dir) {
        const entries = fs_1.default.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path_1.default.join(dir, entry.name);
            const normalizedPath = fullPath.replace(/\\/g, "/");
            if (entry.isDirectory()) {
                result.folders.push(normalizedPath);
                if (recursive) {
                    scan(fullPath);
                }
            }
            else if (entry.isFile()) {
                result.files.push(normalizedPath);
            }
        }
    }
    scan(targetPath);
    return result;
}
//# sourceMappingURL=resolver.js.map