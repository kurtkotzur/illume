YelpClone.Views.UserFavoriteShow = Backbone.View.extend({
  template: JST["user_favorite_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, 'highlight-on', this.highlightOn);
    this.listenTo(this.model, 'highlight-off', this.highlightOff)
  },
  
  events: {
    "mouseenter .user-favorite-show-container": "handleMouseEnter",
    "mouseleave .user-favorite-show-container": "handleMouseLeave"
  },
  
  handleMouseEnter: function () {
    this.model.trigger("mouseEnter", this.model);
  },
  
  handleMouseLeave: function () {
    this.model.trigger("mouseLeave", this.model);
  },
  
  averageStars: function () {
    return Math.round(this.model.get("average_stars") * 2) / 2;
  },
  
  highlightOn: function () {
    this.$el.find(".user-favorite-show-container").addClass("highlighted");
  },
  
  highlightOff: function () {
    this.$el.find(".user-favorite-show-container").removeClass("highlighted");
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