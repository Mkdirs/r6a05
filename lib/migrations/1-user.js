'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('password').notNullable().defaultTo("");
            table.string("email").notNullable().defaultTo("");
            table.string("username").notNullable().defaultTo("");
        });
    },

    async down(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.dropColumn('password');
            table.dropColumn('email');
            table.dropColumn('username');
        });
    }
};
