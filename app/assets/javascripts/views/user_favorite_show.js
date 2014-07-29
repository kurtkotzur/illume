YelpClone.Views.UserFavoriteShow = Backbone.View.extend({
  template: JST["user_favorite_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  averageStars: function () {
    return Math.round(this.model.get("average_stars") * 2) / 2;
  },
  
  render: function () {
    var renderedContent = this.template({ favorite: this.model });
    this.$el.html(renderedContent);
    
    var $currentStars = this.$(".average-stars");
    var starsToEdit = [];
    var i = 1;
    while (starsToEdit.length < Math.floor(this.averageStars())) {
      $currentStar = $currentStars.find("[data-star-id='" + String(i) + "']");
      starsToEdit.push($currentStar);
      i++;
    }
    // if (this.averageStars() % 1 === 0.5) {
 //      $currentStar = $currentStars.find("[data-star-id='" + String(i) + "']");
 //      starsToEdit.push($currentStar);
 //      $currentStar.addClass("half-star")
 //    }
    
    var that = this;
    starsToEdit.forEach( function (star) {
      star.addClass("stars-selected-" + Math.floor(that.averageStars()));
    });
    
    return this;
  }
});