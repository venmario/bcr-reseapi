"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelWithValidator = void 0;
const objection_1 = require("objection");
class ModelWithValidator extends objection_1.Model {
    static createValidator() {
        return new objection_1.AjvValidator({
            onCreateAjv: (ajv) => {
                // Here you can modify the `Ajv` instance.
            },
            options: {
                allErrors: true,
                validateSchema: false,
                ownProperties: true,
            },
        });
    }
}
exports.ModelWithValidator = ModelWithValidator;
