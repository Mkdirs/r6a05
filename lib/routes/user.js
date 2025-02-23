'use strict';

const Joi = require('joi');
const Encrypt = require('@mkdirs/iut-encrypt');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(8).example('Password'),
                    email: Joi.string().required().email().example('email@example.com'),
                    username: Joi.string().min(5).example('NoobMaster69'),
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            request.payload.password = Encrypt.hash('sha256', request.payload.password);
            return userService.create(request.payload);
        }
    },

    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().min(8).example('Password'),
                    email: Joi.string().email().example('email@example.com'),
                    username: Joi.string().min(5).example('NoobMaster69'),
                }),

                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },
        handler: async (request, h) => {

            const { id } = request.params;
            const { userService } = request.services();
            request.payload.password = Encrypt.hash('sha256', request.payload.password);
            return userService.modify(id, request.payload);
        }
    },

    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().min(8).example('Password'),
                    email: Joi.string().email().example('email@example.com'),
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            const email = request.payload.email;
            const password = request.payload.password;

            return userService.login(email, password);
        }
    },

    {
        method: 'get',
        path: '/users',
        options: {
            tags:['api']
        },

        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.list();
        }
    },

    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            const { id } = request.params;
            const nb = await userService.remove(id);
            if(nb > 0){
                return '';
            }
            return "0 row(s) affected";
        }
    }
];