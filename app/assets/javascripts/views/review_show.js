YelpClone.Views.ReviewShow = Backbone.View.extend({
  template: JST["review_show"],
  
  ratingClass: function () {
    return "stars-selected" + String(this.model.get("num_stars"));
  },
  
  render: function () {
    var renderedContent = this.template({ review: this.model });
    
    $currentStars = $("div.star-rating#" + String(this.model.get("id")));
    console.log($currentStars.length);
    var starsToEdit = [];
    var i = 1;
    while (starsToEdit.length < this.model.get("num_stars")) {
      $currentStar = $currentStars.find("#" + i);
      starsToEdit.push($currentStar);
      i++;
    }
    var that = this;
    starsToEdit.forEach( function (star) {
      star.addClass(that.ratingClass());
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})