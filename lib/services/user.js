'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
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
