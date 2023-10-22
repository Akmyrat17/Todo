"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
const userDocs_1 = require("./userDocs");
const apiDocumentation = Object.assign({ openapi: '3.1.0', info: {
        title: 'Simple Todos API',
        description: 'A simple todos API',
        version: '1.0.0',
        contact: {
            name: 'Akmyrat gmail',
            email: 'charyyevakmyrat17@gmail.com',
        },
    } }, userDocs_1.userDocs);
exports.apiDocumentation = apiDocumentation;
