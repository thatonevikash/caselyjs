"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateCase = mutateCase;
const to_camel_js_1 = require("../transforms/to-camel.js");
const to_kebab_js_1 = require("../transforms/to-kebab.js");
const to_pascal_js_1 = require("../transforms/to-pascal.js");
async function mutateCase(path, currentType, expectedType) {
    if (expectedType === "camel") {
        (0, to_camel_js_1.toCamel)(path, currentType);
    }
    if (expectedType === "kebab") {
        (0, to_kebab_js_1.toKebab)(path, currentType);
    }
    if (expectedType === "pascal") {
        (0, to_pascal_js_1.toPascal)(path, currentType);
    }
}
//# sourceMappingURL=mutate-case.js.map