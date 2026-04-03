"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.casely = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resolver_1 = require("./tools/resolver");
const case_identifier_1 = require("./tools/case-identifier");
const chalk_1 = __importDefault(require("chalk"));
let defaultConfig = {
    path: process.cwd(),
    file: ["js", "jsx", "ts", "tsx"],
    case: "kebab",
    operate: "partial",
    dryRun: false,
};
exports.casely = {
    config(options) {
        defaultConfig = { ...defaultConfig, ...options };
    },
    async execute() {
        const { files, folders } = (0, resolver_1.pathResolver)(defaultConfig.path, {
            recursive: true,
        });
        for (const filePath of files) {
            const ext = path_1.default.extname(filePath).slice(1);
            if (!defaultConfig.file.includes(ext))
                continue;
            const dirname = path_1.default.dirname(filePath);
            const basename = path_1.default.basename(filePath, `.${ext}`);
            const currentCase = (0, case_identifier_1.caseIdentifier)(basename);
            if (currentCase !== defaultConfig.case) {
                this.rename(filePath, basename, ext, currentCase);
            }
        }
        if (defaultConfig.operate === "full") {
            const sortedFolders = folders.sort((a, b) => b.length - a.length);
            for (const folderPath of sortedFolders) {
                const basename = path_1.default.basename(folderPath);
                const currentCase = (0, case_identifier_1.caseIdentifier)(basename);
                if (currentCase !== defaultConfig.case) {
                    this.rename(folderPath, basename, "", currentCase);
                }
            }
        }
    },
    rename(fullPath, name, ext, currentCase) {
        const newName = this.transform(name, defaultConfig.case);
        const finalName = ext ? `${newName}.${ext}` : newName;
        const newPath = path_1.default.join(path_1.default.dirname(fullPath), finalName);
        if (defaultConfig.dryRun) {
            console.log(chalk_1.default.yellow(`[DRY RUN] ${path_1.default.basename(fullPath)} ➝ ${finalName}`));
        }
        else {
            fs_1.default.renameSync(fullPath, newPath);
            console.log(chalk_1.default.cyan(`✔ Renamed: ${finalName}`));
        }
    },
    transform(str, target) {
        if (target === "kebab")
            return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        if (target === "camel")
            return str
                .replace(/[-_](.)/g, (_, g) => g.toUpperCase())
                .replace(/^(.)/, (g) => g.toLowerCase());
        if (target === "pascal")
            return str
                .replace(/[-_](.)/g, (_, g) => g.toUpperCase())
                .replace(/^(.)/, (g) => g.toUpperCase());
        return str;
    },
};
//# sourceMappingURL=casely.js.map