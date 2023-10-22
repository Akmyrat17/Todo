"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', user_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/todo', todo_route_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
