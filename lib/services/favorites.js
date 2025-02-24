'use strict';

const {Service} = require("@hapipal/schmervice");
const Boom = require("@hapi/boom");

module.exports = class FavoritesService extends Service {

    async add(movie, user){
        const { Favorites } = this.server.models();
        const fav = {
            userId: user,
            movieId: movie
        };

        const count = (await Favorites.query().where(fav).count())[0];
        if(count['count(*)'] > 0){
            return Boom.internal("Le film est déjà en favoris");
        }

        return Favorites.query().insertAndFetch(fav);
    }

    list(user){
        const { Favorites } = this.server.models();

        return Favorites.query().where({userId: user});
    }

    async remove(movie, user){
        const { Favorites } = this.server.models();

        const fav = await Favorites.query().where({userId: user, movieId: movie});

        if(!fav || fav?.length === 0){
            return Boom.notFound("Le film n'a pas été trouvé");
        }

        return Favorites.query().deleteById(fav[0].id);
    }
};