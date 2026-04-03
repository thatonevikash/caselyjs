import { CaseType } from "../types.js";
export declare function mutateCase(path: string, currentType: Exclude<CaseType, "unknown">, expectedType: Exclude<CaseType, "unknown">): Promise<void>;
