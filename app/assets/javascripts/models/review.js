YelpClone.Models.Review = Backbone.Model.extend({
  urlRoot: "api/reviews",
  
  parse: function (payload) {
    if (payload.user) {
      this.user().set(payload.user);
      delete payload.user;
    }
    if (payload.location) {
      this.location().set(payload.location);
      delete payload.location;
    }
    return payload;
  },
  
  location: function () {
    if(!this._location) {
      this._location = new YelpClone.Models.Location();
    }
    return this._location;
  },
  
  user: function() {
    if(!this._user) {
      this._user = new YelpClone.Models.User();
    }
    return this._user;
  }
});