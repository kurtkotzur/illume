YelpClone.Collections.Reviews = Backbone.Collection.extend({
  model: YelpClone.Models.Review,
  
  url: "api/reviews",
  
  initialize: function (models, options) {
    this.location = options.location;
  }
});