"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDocs = void 0;
const authDocs = {
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
                                $ref: '#/components/schemas/LoginSchema',
                            },
                        },
                    },
                },
            },
        },
        'api/auth/register': {
            post: {
                tags: ['Auth'],
                description: 'Register user',
                operationId: 'register',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RegisterUSer',
                            },
                        },
                    },
                },
            },
        },
    },
    tags: [{ name: 'Auth' }],
    components: {
        schemas: {
            RegisterUSer: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    phone_number: { type: 'number' },
                },
            },
            LoginSchema: {
                type: 'object',
                properties: {
                    phone_number: { type: 'number' },
                    password: { type: 'string' },
                },
            },
        },
    },
};
exports.authDocs = authDocs;
