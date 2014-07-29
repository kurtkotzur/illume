YelpClone.Models.Location = Backbone.Model.extend({
  urlRoot: "api/locations",
  
  initialize: function () {
    this.listenTo(this.favorites(), "remove", this.removeFavoriteUser)
  },
  
  removeFavoriteUser: function (favorite) {
    var userToDelete = this.favoriteUsers().findWhere({
      id: favorite.get("user_id")
    });
    this.favoriteUsers().remove(userToDelete);
  },
  
  favorites: function () {
    this._favorites = this._favorites || new YelpClone.Collections.Favorites(
      [], { location: this, type: "location" }
    );
    return this._favorites;
  },
  
  favoriteUsers: function () {
    this._favoriteUsers = this._favoriteUsers || new YelpClone.Collections.Users();
    return this._favoriteUsers;
  },
  
  reviews: function () {
    this._reviews = this._reviews || new YelpClone.Collections.Reviews(
      [], { location: this, type: "location" }
    );
    return this._reviews;
  },
  
  parse: function (payload) {
    if (payload.favorites) {
      this.favorites().set(payload.favorites, { parse: true });
      delete payload.favorites;
    }
    if (payload.favorite_users) {
      this.favoriteUsers().set(payload.favorite_users, { parse: true });
      delete payload.favorite_users;
    }
    if (payload.reviews) {
      this.reviews().set(payload.reviews, { parse: true });
      delete payload.reviews;
    }
    return payload;
  }
});