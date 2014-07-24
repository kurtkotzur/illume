YelpClone.Views.ReviewNew = Backbone.View.extend({
  template: JST["review_new"],
  
  events: {
    "submit form": "submit",
    "mouseenter button.star": "colorizeStars",
    "mouseleave button.star": "decolorizeStars"
  },
  
  colorizeStars: function (event) {
    var $star = $(event.target);
    var numStars = parseInt($star.attr("id"));
    var starsToEdit = [$star];
    
    var i = 1;
    while (starsToEdit.length < numStars) {
      $currentStar = $("#" + i);
      starsToEdit.push($currentStar);
      i++;
    }
    
    var newClass = "stars-selected-" + String(numStars);
    starsToEdit.forEach( function (star) {
      star.addClass(newClass);
    });
  },
  
  decolorizeStars: function (event) {
    $(".star-rating").children().attr("class", "btn btn-default btn-xs star");
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