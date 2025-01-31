'use strict';

const Joi = require('joi')

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
            return await userService.create(request.payload);
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