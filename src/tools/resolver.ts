import fs from "fs";
import path from "path";

// -------------------------------------------------------------

interface PathResolverOptions {
  recursive?: boolean;
}

interface PathResolverResult {
  files: string[];
  folders: string[];
}

// -------------------------------------------------------------

/**
 * List all files and folders in a given path
 * @param targetPath - The directory to scan
 * @param options - Configuration options
 * @param options.recursive - If true, lists recursively (default: false)
 * @returns An object containing arrays of file and folder paths
 */
export function pathResolver(
  targetPath: string,
  options: PathResolverOptions = {},
): PathResolverResult {
  const { recursive = false } = options;

  const result: PathResolverResult = {
    files: [],
    folders: [],
  };

  function scan(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const normalizedPath = fullPath.replace(/\\/g, "/");

      if (entry.isDirectory()) {
        result.folders.push(normalizedPath);
        if (recursive) {
          scan(fullPath);
        }
      } else if (entry.isFile()) {
        result.files.push(normalizedPath);
      }
    }
  }

  scan(targetPath);
  return result;
}
