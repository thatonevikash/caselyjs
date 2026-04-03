interface PathResolverOptions {
    recursive?: boolean;
}
interface PathResolverResult {
    files: string[];
    folders: string[];
}
export declare function pathResolver(targetPath: string, options?: PathResolverOptions): PathResolverResult;
export {};
