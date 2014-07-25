YelpClone.Views.ReviewNew = Backbone.View.extend({
  template: JST["review_new"],
  
  events: {
    "submit form": "submit",
    "mouseenter button.star": "colorizeStars",
    "mouseleave button.star": "decolorizeStars",
    "click button.star": "recordRating"
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
    $(".new-star-rating").children().attr("class", "btn btn-default btn-xs star");
  },
  
  recordRating: function (event) {
    var $star = $(event.currentTarget);
    this._numStars = parseInt($star.attr("id"));
    
    var starsToEdit = [];
    
    var i = 1;
    while(starsToEdit.length < this._numStars) {
      $currentStar = $("#" + i);
      starsToEdit.push($currentStar);
      i++;
    }
    
    for (var i = 1; i < 6; i++) {
      var $currentStar = $("#" + i);
      $currentStar.removeClass("star");
      $currentStar.addClass("static-star");
    }
    
    var newClass = "stars-selected-" + this._numStars;
    starsToEdit.forEach( function (star) {
      star.addClass(newClass);
    })
  },
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    params["review"]["num_stars"] = this._numStars;
    var review = new YelpClone.Models.Review(params["review"]);
    var that = this;
    review.save({}, {
      success: function () {
        that.model.reviews().add(review);
        that.render();
        that.model.fetch();
      }
    });
  }
});