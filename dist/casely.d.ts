import { CaselyConfig, CaseType } from "./types";
export declare const casely: {
    config(options: Partial<CaselyConfig>): void;
    execute(): Promise<void>;
    rename(fullPath: string, name: string, ext: string, currentCase: CaseType): void;
    transform(str: string, target: CaseType): string;
};
