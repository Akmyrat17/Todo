"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const router = express_1.default.Router();
// Middleware for all
router.use(deserializeUser_1.deserializeUser);
// Get currently logged in user
router.get('/me', requireUser_1.requireUser, user_controller_1.getMeHandler);
router.post('/create', user_controller_1.create);
router.get('/:id', user_controller_1.getById);
router.get('/', user_controller_1.getAll);
router.patch('/:id', user_controller_1.update);
exports.default = router;
