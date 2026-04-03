import path from "path";
import fs from "fs";
import { pathResolver } from "./tools/resolver";
import { caseIdentifier } from "./tools/case-identifier";
import { CaselyConfig, CaseType } from "./types";
import chalk from "chalk";

// -------------------------------------------------------------

let defaultConfig: CaselyConfig = {
  path: process.cwd(),
  file: ["js", "jsx", "ts", "tsx"],
  case: "kebab",
  operate: "partial",
  dryRun: false,
};

// -------------------------------------------------------------

export const casely = {
  config(options: Partial<CaselyConfig>) {
    defaultConfig = { ...defaultConfig, ...options };
  },

  async execute() {
    const { files, folders } = pathResolver(defaultConfig.path, {
      recursive: true,
    });

    // 1. Handle Files
    for (const filePath of files) {
      const ext = path.extname(filePath).slice(1);
      if (!defaultConfig.file.includes(ext)) continue;

      const dirname = path.dirname(filePath);
      const basename = path.basename(filePath, `.${ext}`);
      const currentCase = caseIdentifier(basename);

      if (currentCase !== defaultConfig.case) {
        this.rename(filePath, basename, ext, currentCase);
      }
    }

    // 2. Handle Folders (Bottom-Up)
    if (defaultConfig.operate === "full") {
      const sortedFolders = folders.sort((a, b) => b.length - a.length);
      for (const folderPath of sortedFolders) {
        const basename = path.basename(folderPath);
        const currentCase = caseIdentifier(basename);

        if (currentCase !== defaultConfig.case) {
          this.rename(folderPath, basename, "", currentCase);
        }
      }
    }
  },

  rename(fullPath: string, name: string, ext: string, currentCase: CaseType) {
    const newName = this.transform(name, defaultConfig.case);
    const finalName = ext ? `${newName}.${ext}` : newName;
    const newPath = path.join(path.dirname(fullPath), finalName);

    if (defaultConfig.dryRun) {
      console.log(
        chalk.yellow(`[DRY RUN] ${path.basename(fullPath)} ➝ ${finalName}`),
      );
    } else {
      fs.renameSync(fullPath, newPath);
      console.log(chalk.cyan(`✔ Renamed: ${finalName}`));
    }
  },

  transform(str: string, target: CaseType): string {
    // Your transformation logic (toCamel, toKebab, etc)
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
