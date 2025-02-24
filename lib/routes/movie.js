'use strict';

const Joi = require("joi");
module.exports = [
    {
        method: 'GET',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin', 'user'],
            },
            tags:['api']
        },

        handler: async (request, h) => {
            const { movieService } = request.services();

            return movieService.list();
        }
    },

    {
        method: 'PATCH',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags:['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).example('Les 4 fantastiques').description('Title of the movie'),
                    description: Joi.string().min(3).example('').description('Description of the movie'),
                    releaseDate: Joi.date().iso().example("2025-02-24").description('Release date of the movie'),
                    director: Joi.string().min(3).example('Jean').description('Director of the movie')
                }),

                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },

        handler: async (request, h) => {
            const { movieService } = request.services();
            const { id } = request.params;

            return movieService.modify(id, request.payload);
        }
    },

    {
        method: 'POST',
        path: '/movie',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags:['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).example('Les 4 fantastiques').description('Title of the movie'),
                    description: Joi.string().min(3).example('').description('Description of the movie'),
                    releaseDate: Joi.date().iso().example("2025-02-24").description('Release date of the movie'),
                    director: Joi.string().min(3).example('Jean').description('Director of the movie')
                })
            }
        },

        handler: async (request, h) => {
            const { movieService, userService, emailService } = request.services();

            const movie = request.payload;

            for(const user of await userService.list()){
                emailService.send('noreply@project.com', user.email, {
                    subject: `Le film ${movie.title} a été ajouté`,
                    text: `Le film ${movie.title} a été ajouté`
                });
            }

            return movieService.create(movie);
        }
    },

    {
        method: 'DELETE',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags:['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },

        handler: async (request, h) => {
            const { movieService } = request.services();
            const { id } = request.params;

            return movieService.remove(id);
        }
    }
];