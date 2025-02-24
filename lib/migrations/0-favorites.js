'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorites', (table) => {

            table.increments('id').primary();
            table.integer('userId').notNullable();
            table.integer('movieId').notNullable();
            table.unique(['userId', 'movieId']);
            table.foreign('userId').references('user.id');
            table.foreign('movieId').references('movie.id');

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorites');
    }
};
