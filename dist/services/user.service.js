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
exports.signToken = exports.findUser = exports.findUserByPhoneNumer = exports.findUserById = exports.updateUser = exports.createUser = void 0;
const constants_1 = require("../utils/constants");
const jwt_1 = require("../utils/jwt");
const client_1 = require("@prisma/client");
const hash_1 = require("../utils/hash");
const prisma = new client_1.PrismaClient();
const createUser = (password, username, email, phone_number, role) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield (0, hash_1.hashLocal)(password);
    return yield prisma.user.create({
        data: {
            username,
            email,
            password: hashed,
            phone_number,
            role: role ? role : 'user',
        },
    });
});
exports.createUser = createUser;
const updateUser = (id, phone_number, email, username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { id },
        data: { phone_number, email, username },
    });
});
exports.updateUser = updateUser;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { id: userId },
        select: {
            username: true,
            email: true,
            phone_number: true,
            id: true,
            role: true,
        },
    });
});
exports.findUserById = findUserById;
const findUserByPhoneNumer = (phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { phone_number: phone_number },
    });
});
exports.findUserByPhoneNumer = findUserByPhoneNumer;
const findUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany({
        select: {
            username: true,
            email: true,
            phone_number: true,
            id: true,
        },
    });
});
exports.findUser = findUser;
const signToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Create Access roken
    const access_token = (0, jwt_1.signJwt)({ sub: user.id }, constants_1.jwtSecretKey, {
        expiresIn: `${constants_1.tokenExpiresIn}m`,
    });
    return { access_token };
});
exports.signToken = signToken;
