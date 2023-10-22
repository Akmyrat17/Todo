"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDocs = void 0;
const userDocs = {
    paths: {
        '/api/users': {
            post: {
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
                tags: ['Users'],
                description: 'Get all users',
                operationId: 'getAllUsers',
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
        'api/users/{id}': {
            put: {
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
    },
    tags: [{ name: 'Users' }],
    components: {
        schemas: {
            id: {
                type: 'integer',
                description: 'id of user',
                example: 5,
            },
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
exports.userDocs = userDocs;
