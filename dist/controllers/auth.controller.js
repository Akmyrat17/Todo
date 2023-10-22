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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const client_1 = require("@prisma/client");
const hash_1 = require("../utils/hash");
const appError_1 = __importDefault(require("../utils/appError"));
const user_schema_1 = require("../schemas/user.schema");
const prisma = new client_1.PrismaClient();
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, phone_number } = req.body;
    yield user_schema_1.createUserSchema.validateAsync(req.body).catch((err) => {
        return next(new appError_1.default(400, err.message));
    });
    const user = yield (0, user_service_1.createUser)(password, username, email, phone_number, 'user');
    if (!user)
        return next(new appError_1.default(500, 'Internal server Error'));
    const token = yield (0, user_service_1.signToken)(user);
    return res.status(201).json({
        status: 'success',
        data: {
            token,
        },
    });
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone_number, password } = req.body;
    yield user_schema_1.loginUserSchema.validateAsync(req.body).catch((err) => {
        return next(new appError_1.default(400, err.message));
    });
    const user = yield (0, user_service_1.findUserByPhoneNumer)(phone_number);
    if (!user)
        return next(new appError_1.default(404, 'User not found'));
    const isValid = yield (0, hash_1.compareLocal)(password, user.password);
    if (!isValid)
        return next(new appError_1.default(401, 'Invalid credentials'));
    const token = yield (0, user_service_1.signToken)(user);
    return res.status(200).json({
        status: 'success',
        data: {
            token,
        },
    });
});
exports.loginUser = loginUser;
