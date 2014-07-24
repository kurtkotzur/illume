YelpClone.Models.Review = Backbone.Model.extend({
  urlRoot: "api/reviews",
  
  parse: function (payload) {
    if (payload.user) {
      this._user = this._user || payload.user;
      delete payload.user;
    }
    return payload;
  }
});