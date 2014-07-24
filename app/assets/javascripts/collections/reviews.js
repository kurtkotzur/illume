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
  },
  
  comparator: function (review1, review2) {
    date1 = moment(review1.get("created_at"))._d;
    date2 = moment(review2.get("created_at"))._d;
    return (date2 < date1 ? 1 : -1);
  }
});