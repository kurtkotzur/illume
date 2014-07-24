YelpClone.Collections.Reviews = Backbone.Collection.extend({
  model: YelpClone.Models.Review,
  
  url: function () {
    if (this.type === "location") {
      return this.location.url() + "/reviews";
    }
  },
  
  initialize: function (models, options) {
    this.type = options.type;
    if (this.type === "location") {
      this.location = options.location;
    }
  }
});