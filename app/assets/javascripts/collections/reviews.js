YelpClone.Collections.Reviews = Backbone.Collection.extend({
  model: YelpClone.Models.Review,
  
  url: function () {
    if (this.type === "location") {
      return this.location.url() + "/reviews";
    } else if (this.type === "user") {
      return "/api" + this.user.url() + "/reviews";
    }
  },
  
  initialize: function (models, options) {
    this.type = options.type;
    if (this.type === "location") {
      this.location = options.location;
    } else if (this.type === "user") {
      this.user = options.user;
    }
  },
  
  comparator: "created_at"
});