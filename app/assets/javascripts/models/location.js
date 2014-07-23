YelpClone.Models.Location = Backbone.Model.extend({
  urlRoot: "api/locations",
  
  reviews: function () {
    this._reviews = this._reviews || new YelpClone.Collections.Reviews([], { location: this });
    return this._reviews;
  }
});