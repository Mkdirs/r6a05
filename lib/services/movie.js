'use strict';

const {Service} = require("@hapipal/schmervice");

module.exports = class MovieService extends Service {
    create(movie){
        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    list(){
        const { Movie } = this.server.models();

        return Movie.query();
    }

    modify(id, newMovie){
        const { Movie } = this.server.models();

        return Movie.query().updateAndFetchById(id, newMovie);
    }

    remove(id){
        const { Movie } = this.server.models();

        return Movie.query().deleteById(id);
    }
};