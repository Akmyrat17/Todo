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
exports.deserializeUser = void 0;
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = require("../utils/jwt");
const constants_1 = require("../utils/constants");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default(401, 'You are not logged in'));
        }
        // Validate the access token
        const decoded = (0, jwt_1.verifyJwt)(access_token, constants_1.jwtSecretKey);
        if (!decoded) {
            return next(new appError_1.default(401, `Invalid token or user doesn't exist`));
        }
        // Check if the user still exist
        const user = yield (0, user_service_1.findUserById)(decoded.sub);
        if (!user) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        // Add user to res.locals
        res.locals.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUser = deserializeUser;
