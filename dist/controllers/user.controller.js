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
exports.getAll = exports.update = exports.getById = exports.create = exports.getMeHandler = void 0;
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const user_schema_1 = require("../schemas/user.schema");
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getMeHandler = getMeHandler;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userLocale = res.locals.user;
    if (userLocale.role === 'admin') {
        const userValidated = user_schema_1.createUserSchema.validate(req.body);
        if (userValidated.error) {
            return next(new appError_1.default(400, userValidated.error.message));
        }
        else {
            const { password, username, email, phone_number, role } = req.body;
            const user = yield (0, user_service_1.createUser)(password, username, email, phone_number, role);
            if (user) {
                return res.status(201).json({
                    status: 'success',
                    data: {
                        username: user.username,
                        email: user.email,
                        phone_number: user.phone_number,
                        id: user.id,
                    },
                });
            }
            throw new appError_1.default(500, 'Internal server Error');
        }
    }
    return next(new appError_1.default(403, 'You dont have permission to do this operation'));
});
exports.create = create;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userLocale = res.locals.user;
    if (userLocale.role === 'admin' || userLocale.id === id) {
        const user = yield (0, user_service_1.findUserById)(id);
        if (!user)
            return next(new appError_1.default(404, 'User not found'));
        return res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    return next(new appError_1.default(403, 'You dont have permission to do this operation'));
});
exports.getById = getById;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userLocale = res.locals.user;
    if (userLocale.role === 'admin' || userLocale.id === id) {
        const { username, password, phone_number } = req.body;
        const updatedUser = user_schema_1.updateUserSchema.validate(req.body);
        if (updatedUser.error) {
            return next(new appError_1.default(400, updatedUser.error.message));
        }
        else {
            return yield (0, user_service_1.updateUser)(id, phone_number, password, username);
        }
    }
    return next(new appError_1.default(403, 'You dont have permission to do this operation'));
});
exports.update = update;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (user.role === 'admin') {
        const users = yield (0, user_service_1.findUser)();
        if (users.length === 0)
            return next(new appError_1.default(404, 'User not found'));
        return res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    }
    return next(new appError_1.default(403, 'You dont have permission to do this operation'));
});
exports.getAll = getAll;
