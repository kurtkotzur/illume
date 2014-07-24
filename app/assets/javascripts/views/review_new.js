YelpClone.Views.ReviewNew = Backbone.View.extend({
  template: JST["review_new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var review = new YelpClone.Models.Review(params["review"]);
    var that = this;
    review.save({}, {
      success: function () {
        that.model.reviews().add(review);
        that.render();
      }
    });
  }
});