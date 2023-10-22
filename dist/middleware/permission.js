"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const permission = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        return next(new appError_1.default(401, 'You are not logged in'));
    }
    if (user.role == 'admin')
        return next();
    return next(new appError_1.default(403, 'You dont have permission to do this operation'));
};
exports.permission = permission;
