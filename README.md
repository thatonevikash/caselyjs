# 🛠️ caselyjs

**caselyjs** is a high-performance TypeScript-powered CLI and programmatic utility designed to **rename files and directories** across your entire codebase using consistent naming conventions.

> Say goodbye to manually renaming 100+ files in your project!

---

## ✨ New in v1.0

- **Native TypeScript Support**: Full type definitions included.
- **Powerful CLI**: Run transformations directly from your terminal.
- **Dry Run Mode**: Preview changes before they are applied to your filesystem.
- **Recursive Bottom-Up Renaming**: Safely renames nested directories without breaking paths.
- **Enhanced Extension Support**: Easily filter which file types to transform.

---

## 📦 Installation

### For CLI usage (Global)

```bash
npm install -g caselyjs
```

### For Programmatic usage (Local)

```bash
npm install caselyjs
```

## 🚀 CLI Usage

You can now run `caselyjs` directly from your terminal without writing any code.

```bash
# Basic usage (defaults to kebab-case and .js, .jsx, .ts, .tsx files)
caselyjs ./src

# Convert to PascalCase including folders
caselyjs ./src --case pascal --full

# Custom extensions and Dry Run (see changes before they happen)
caselyjs ./src --ext "js,ts,css" --case camel --dry
```

## ⚡ Quick Run (No Installation Required)

```bash
# Rename all .js/ts files in the current folder to kebab-case
npx caselyjs .

# Run a full conversion to PascalCase on a specific folder
npx caselyjs ./src/components --case pascal --full

# Preview changes in a specific directory without actually renaming anything
npx caselyjs ./my-project --dry
```

### Why this is the "Pro" way to use CaselyJS:

- **No Clutter**: Doesn't stay on the user's machine or in their node_modules.

- **Always Fresh**: npx always pulls the latest version (v2.0.0+), so they get your newest bug fixes and case-identification logic automatically.

- **CI/CD Friendly**: Perfect for use in GitHub Actions or automation scripts where you want to enforce a naming convention during a build step without a permanent install.

## CLI Options

| Flag     | Shorthand | Description                                 | Default         |
| :------- | :-------- | :------------------------------------------ | :-------------- |
| `--case` | -c        | "Target case: camel, kebab, or pascal"      | kebab           |
| `--ext`  | -e        | Comma-separated list of file extensions     | "js,jsx,ts,tsx" |
| `--full` | -f        | Rename directories in addition to files     | false           |
| `--dry`  |           | Show intended changes without applying them | false           |

## 💻 Programmatic Usage

If you prefer to integrate CaselyJS into your own build scripts or tools:

```ts
import { casely } from "caselyjs";

casely.config({
  path: "./src",
  case: "camel",
  file: ["ts", "tsx"],
  operate: "full", // 'partial' (files only) or 'full' (files + folders)
  dryRun: true, // highly recommended for testing
});

await casely.execute();
```

## ⚙️ Advanced Configuration

> [!NOTE]\
>
> - **Recursive by Default**: You only need to provide the root directory. CaselyJS automatically traverses all subdirectories.
> - **Safety First**: When using operate: "full", CaselyJS uses a bottom-up renaming strategy to ensure directory paths remain valid during the process.

### Supported Case Types

- kebab-case
- camelCase
- PascalCase

## 🛠️ Built With

- **TypeScript** - For type-safe filesystem operations.
- **Commander.js** - Robust CLI argument parsing.
- **Chalk** - Beautifully colored terminal output.

### 👨‍💻 Author

**Made with ❤️ by _codezaura_**
