'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(8).example('Password'),
            email: Joi.string().email().example('Email').description('Email of the user'),
            username: Joi.string().min(5).example('NoobMaster69'),
            scope: Joi.string().example('user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.scope = 'user';
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};