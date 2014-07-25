YelpClone.Views.ReviewShow = Backbone.View.extend({
  template: JST["review_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  ratingClass: function () {
    return "stars-selected-" + String(this.model.get("num_stars"));
  },
  
  render: function () {
    var renderedContent = this.template({ review: this.model });
    
    this.$el.html(renderedContent);
    
    var $currentStars = this.$("div.star-rating[data-review-id='" + this.model.get('id') + "']");
    
    var starsToEdit = [];
    var i = 1;
    while (starsToEdit.length < this.model.get("num_stars")) {
      $currentStar = $currentStars.find("[data-star-id='" + String(i) + "']");
      starsToEdit.push($currentStar);
      i++;
    }
    
    var that = this;
    starsToEdit.forEach( function (star) {
      star.addClass(that.ratingClass());
    });
    
    return this;
  }
})