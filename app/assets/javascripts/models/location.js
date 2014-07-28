YelpClone.Models.Location = Backbone.Model.extend({
  urlRoot: "api/locations",
  
  favorites: function () {
    this._favorites = this._favorites || new YelpClone.Collections.Favorites(
      [], { user: this, type: "location" }
    );
    return this._favorites;
  },
  
  reviews: function () {
    this._reviews = this._reviews || new YelpClone.Collections.Reviews(
      [], { location: this, type: "location" }
    );
    return this._reviews;
  },
  
  parse: function (payload) {
    if (payload.favorites) {
      this.reviews().set(payload.reviews, { parse: true });
      delete payload.reviews;
    }
    if (payload.reviews) {
      this.reviews().set(payload.reviews, { parse: true });
      delete payload.reviews;
    }
    return payload;
  }
});