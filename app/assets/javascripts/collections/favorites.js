YelpClone.Collections.Favorites = Backbone.Collection.extend({
  model: YelpClone.Models.Favorite,
  
  url: function () {
    if (this.type === "location") {
      return this.location.url() + "/favorites";
    } else if (this.type === "user") {
      return "/api" + this.user.url() + "/favorites";
    }
  },
  
  initialize: function (models, options) {
    this.type = options.type;
    if (this.type === "location") {
      this.location = options.location;
    } else if (this.type === "user") {
      this.user = options.user;
    }
  }
});