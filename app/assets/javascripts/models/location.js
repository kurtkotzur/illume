YelpClone.Models.Location = Backbone.Model.extend({
  urlRoot: "api/locations",
  
  reviews: function () {
    this._reviews = this._reviews || new YelpClone.Collections.Reviews(
      [], { location: this, type: "location" }
    );
    return this._reviews;
  },
  
  parse: function (payload) {
    if (payload.reviews) {
      this.reviews().set(payload.reviews, { parse: true });
      delete payload.reviews;
    }
    return payload;
  }
});