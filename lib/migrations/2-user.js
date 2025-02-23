'use strict';

module.exports = {
    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('scope').notNullable().defaultTo("user");
        });
    },

    async down(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.dropColumn('scope');
        });
    }
};