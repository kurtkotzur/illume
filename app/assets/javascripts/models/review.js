YelpClone.Models.Review = Backbone.Model.extend({
  urlRoot: "api/reviews",
  
  parse: function (payload) {
    if (payload.user) {
      this.user().set(payload.user);
      delete payload.user;
    }
    return payload;
  },
  
  user: function() {
    if(!this._user) {
      this._user = new YelpClone.Models.User();
    }
    return this._user;
  }
});