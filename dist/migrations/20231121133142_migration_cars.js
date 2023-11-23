"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("cars", (table) => {
            table.uuid("id").defaultTo(knex.fn.uuid()).primary();
            table.string("plate").notNullable;
            table.string("manufacture").notNullable;
            table.string("model").notNullable;
            table.string("image").notNullable;
            table.integer("rentPerDay").notNullable;
            table.integer("capacity").notNullable;
            table.string("description").notNullable;
            table.datetime("availableAt").notNullable;
            table.string("transmission").notNullable;
            table.boolean("available").notNullable;
            table.string("type").notNullable;
            table.boolean("driver").notNullable;
            table.integer("year").notNullable;
            table.jsonb("options").notNullable;
            table.jsonb("specs").notNullable;
            table.timestamps();
            table.timestamp("deleted_at");
            table.integer("created_by").notNullable().references("id").inTable("users");
            table.integer("updated_by").nullable().references("id").inTable("users");
            table.integer("deleted_by").nullable().references("id").inTable("users");
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("cars");
    });
}
exports.down = down;
