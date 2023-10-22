"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const router = express_1.default.Router();
router.get('/all', deserializeUser_1.deserializeUser, todo_controller_1.findAll);
router.post('/', deserializeUser_1.deserializeUser, todo_controller_1.create);
router.get('/:id', deserializeUser_1.deserializeUser, todo_controller_1.findOne);
router.patch('/:id', deserializeUser_1.deserializeUser, todo_controller_1.update);
exports.default = router;
