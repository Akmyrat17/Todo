"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
const apiDocumentation = {
    openapi: '3.1.0',
    info: {
        title: 'Simple Todos API',
        description: 'A simple todos API',
        version: '1.0.0',
        contact: {
            name: 'Akmyrat gmail',
            email: 'charyyevakmyrat17@gmail.com',
        },
    },
    paths: {
        '/api/auth/login': {
            post: {
                tags: ['Auth'],
                description: 'Login user',
                operationId: 'login',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserLoginSchema',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/auth/register': {
            post: {
                tags: ['Auth'],
                description: 'Register user',
                operationId: 'register',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    password: { type: 'string' },
                                    username: { type: 'string' },
                                    email: { type: 'string' },
                                    phone_number: { type: 'number' },
                                    role: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/users': {
            post: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Users'],
                description: 'Create a new user',
                operationId: 'createUser',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserCreateSchema',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UserCreateSchema',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorSchema',
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorSchema',
                                },
                            },
                        },
                    },
                },
            },
            get: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Users'],
                description: 'Get all users',
                operationId: 'getAllUsers',
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/UsersSchema',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/users/{id}': {
            put: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                path: '/api/users/{id}',
                tags: ['Users'],
                parameters: [
                    { name: 'id', in: 'path', description: 'id of user', required: true },
                ],
                description: 'Update a user',
                operationId: 'updateUser',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserUpdateSchema',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UsersSchema',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Users'],
                parameters: [
                    { name: 'id', in: 'path', description: 'id of user', required: true },
                ],
                description: 'Delete a user',
                operationId: 'deleteUser',
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UsersSchema',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/todo': {
            get: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Todos'],
                description: 'Get all todos',
                operationId: 'getAllTodos',
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        properties: {
                                            title: { type: 'string' },
                                            desc: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Todos'],
                description: 'Create a new todo',
                operationId: 'createTodo',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    desc: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Todo created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        desc: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/todo/{id}': {
            put: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Todos'],
                parameters: [
                    { name: 'id', in: 'path', description: 'id of todo', required: true },
                ],
                description: 'Update a todo',
                operationId: 'updateTodo',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    desc: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        desc: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Todos'],
                parameters: [
                    { name: 'id', in: 'path', description: 'id of todo', required: true },
                ],
                description: 'Delete a todo',
                operationId: 'deleteTodo',
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        desc: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            get: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ['Todos'],
                parameters: [
                    { name: 'id', in: 'path', description: 'id of todo', required: true },
                ],
                description: 'Get a todo',
                operationId: 'getTodo',
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        desc: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            UsersSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'id of user',
                        example: 5,
                    },
                    username: {
                        type: 'string',
                        description: 'username of user',
                        example: 'username',
                    },
                    email: {
                        type: 'string',
                        description: 'email of user',
                        example: 'akmyratcharyyev17@gmail.com',
                    },
                    phone_number: {
                        type: 'integer',
                        description: 'phone number of user',
                        example: 61000000,
                    },
                },
            },
            UserCreateSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'id of user',
                        example: 5,
                    },
                    username: {
                        type: 'string',
                        description: 'username of user',
                        example: 'username',
                    },
                    email: {
                        type: 'string',
                        description: 'email of user',
                        example: 'akmyratcharyyev17@gmail.com',
                    },
                    phone_number: {
                        type: 'integer',
                        description: 'phone number of user',
                        example: 61000000,
                    },
                    role: {
                        type: 'string',
                        description: 'role of user',
                        example: 'admin',
                        enum: ['admin', 'user'],
                    },
                    password: {
                        type: 'string',
                        description: 'password of user',
                        example: 'password',
                    },
                },
            },
            UserUpdateSchema: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: 'username of user',
                        example: 'username',
                    },
                    email: {
                        type: 'string',
                        description: 'email of user',
                        example: 'akmyratcharyyev17@gmail.com',
                    },
                    phone_number: {
                        type: 'integer',
                        description: 'phone number of user',
                        example: 61000000,
                    },
                },
            },
            UserLoginSchema: {
                type: 'object',
                properties: {
                    phone_number: {
                        type: 'integer',
                        description: 'phone number of user',
                        example: 61000000,
                    },
                    password: {
                        type: 'string',
                        description: 'password of user',
                        example: 'password',
                    },
                },
            },
            RegisterUSer: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    phone_number: { type: 'number' },
                },
            },
            ErrorSchema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'message of error',
                        example: 'message',
                    },
                    statusCode: {
                        type: 'integer',
                        description: 'status code of error',
                        example: 500,
                    },
                },
            },
        },
    },
};
exports.apiDocumentation = apiDocumentation;
