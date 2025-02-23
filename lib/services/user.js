'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@mkdirs/iut-encrypt');
const Boom = require("@hapi/boom");

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    modify(user_id, newUser){
        const { User } = this.server.models();
        return User.query().updateAndFetchById(user_id, newUser);
    }

    async login(email, password){
        const { User } = this.server.models();
        const user = await User.query().findOne({email});

        if(! Encrypt.verify(user.password, password, 'sha256')){
            return Boom.unauthorized();
        }

        return {login: "successful"};
    }

    remove(user_id){
        const { User } = this.server.models();
        return User.query().deleteById(user_id);
    }

    list(){
        const { User } = this.server.models();

        return User.query();
    }
}
