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
exports.findAll = exports.findOne = exports.update = exports.create = void 0;
const todo_schema_1 = require("../schemas/todo.schema");
const appError_1 = __importDefault(require("../utils/appError"));
const todo_service_1 = require("../services/todo.service");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = todo_schema_1.createTodoSchema.validate(req.body);
    if (validated.error) {
        return next(new appError_1.default(400, validated.error.message));
    }
    else {
        const { title, desc } = req.body;
        const todo = yield (0, todo_service_1.createTodo)(title, desc, res.locals.user.id);
        return res.status(201).json({
            status: 'success',
            data: {
                todo,
            },
        });
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield (0, todo_service_1.getById)(parseInt(id));
    if (!todo)
        return next(new appError_1.default(404, 'Todo not found'));
    else if (todo.userId !== res.locals.user.id) {
        return next(new appError_1.default(403, 'You dont have permission to do this operation'));
    }
    else {
        const updatedTodo = todo_schema_1.updateTodoSchema.validate(req.body);
        if (updatedTodo.error) {
            return next(new appError_1.default(400, updatedTodo.error.message));
        }
        else {
            const updated = yield (0, todo_service_1.updateTodo)(parseInt(id), req.body.title, req.body.desc);
            return res.status(200).json({
                status: 'success',
                data: {
                    updated,
                },
            });
        }
    }
});
exports.update = update;
const findOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield (0, todo_service_1.getById)(parseInt(id));
    console.log(todo);
    if (!todo)
        return next(new appError_1.default(404, 'Todo not found'));
    if (todo.userId !== res.locals.user.id)
        return next(new appError_1.default(403, 'You dont have permission to do this operation'));
    return res.status(200).json({
        status: 'success',
        data: {
            todo,
        },
    });
});
exports.findOne = findOne;
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (user.role === 'admin') {
        return res.status(200).json({
            status: 'success',
            data: {
                todos: yield (0, todo_service_1.getAllTodosAdmin)(),
            },
        });
    }
    else if (user.role === 'user') {
        return res.status(200).json({
            status: 'success',
            data: {
                todos: yield (0, todo_service_1.getAllTodosUser)(res.locals.user.id),
            },
        });
    }
});
exports.findAll = findAll;
