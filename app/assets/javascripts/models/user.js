YelpClone.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  
  favorites: function () {
    this._favorites = this._favorites || new YelpClone.Collections.Favorites(
      [], { user: this, type: "user" }
    );
    return this._favorites;
  },
  
  reviews: function () {
    this._reviews = this._reviews || new YelpClone.Collections.Reviews(
      [], { user: this, type: "user" }
    );
    return this._reviews;
  },
  
  parse: function (payload) {
    if (payload.reviews) {
      this.reviews().set(payload.reviews, { parse: true });
      delete payload.reviews;
    }
    if (payload.favorites) {
      this.favorites().set(payload.favorites, { parse: true });
      delete payload.favorites;
    }
    return payload;
  }
})