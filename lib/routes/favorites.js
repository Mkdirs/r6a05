'use strict';

const Joi = require("joi");

module.exports = [
    {
        method: 'GET',
        path: '/user/{id}/favorites',
        options: {
            auth: {
                scope: ['admin', 'user'],
            },
            tags:['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        },

        handler: async (request, h) => {
            const { favoritesService } = request.services();
            const { id } = request.params;

            return favoritesService.list(id);
        }
    },

    {
        method: 'POST',
        path: '/user/{user}/favorites/{movie}',
        options: {
            auth: {
                scope: ['admin', 'user'],
            },
            tags:['api'],
            validate: {
                params: Joi.object({
                    user: Joi.number().integer().required(),
                    movie: Joi.number().integer().required()
                })
            }
        },

        handler: async (request, h) => {
            const { favoritesService } = request.services();
            const { user, movie } = request.params;

            return favoritesService.add(movie, user);
        }
    },

    {
        method: 'DELETE',
        path: '/user/{user}/favorites/{movie}',
        options: {
            auth: {
                scope: ['admin', 'user'],
            },
            tags:['api'],
            validate: {
                params: Joi.object({
                    user: Joi.number().integer().required(),
                    movie: Joi.number().integer().required()
                })
            }
        },

        handler: async (request, h) => {
            const { favoritesService } = request.services();
            const { user, movie } = request.params;

            return favoritesService.remove(movie, user);
        }
    }
];