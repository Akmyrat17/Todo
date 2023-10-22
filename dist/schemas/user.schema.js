"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
var RoleUser;
(function (RoleUser) {
    RoleUser["ADMIN"] = "admin";
    RoleUser["USER"] = "user";
})(RoleUser || (RoleUser = {}));
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(16).required(),
    role: joi_1.default.string().valid(RoleUser.ADMIN, RoleUser.USER).optional(),
    phone_number: joi_1.default.number().required().min(61000000).max(65999999),
});
exports.updateUserSchema = joi_1.default.object({
    phone_number: joi_1.default.number().required().min(61000000).max(65999999),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().required(),
});
exports.loginUserSchema = joi_1.default.object({
    phone_number: joi_1.default.number().required().min(61000000).max(65999999),
    password: joi_1.default.string().min(8).max(16).required(),
});
