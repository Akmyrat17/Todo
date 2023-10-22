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
exports.getAllTodosAdmin = exports.getAllTodosUser = exports.getById = exports.deleteTodo = exports.updateTodo = exports.createTodo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTodo = (title, desc, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.create({
        data: {
            title: title,
            desc: desc,
            userId: userId,
        },
    });
});
exports.createTodo = createTodo;
const updateTodo = (id, title, desc) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.update({
        where: {
            id,
        },
        data: {
            title,
            desc,
        },
    });
});
exports.updateTodo = updateTodo;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.delete({
        where: {
            id,
        },
    });
});
exports.deleteTodo = deleteTodo;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.findUnique({
        where: {
            id,
        },
    });
});
exports.getById = getById;
const getAllTodosUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.findMany({
        where: { userId: id },
    });
});
exports.getAllTodosUser = getAllTodosUser;
const getAllTodosAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.findMany();
});
exports.getAllTodosAdmin = getAllTodosAdmin;
