YelpClone.Views.LocationInfo = Backbone.View.extend({
  template: JST["location_info"],
  
  events: {
    "click button.toggle-favorite": "handleFavorite"
  },
  
  initialize: function () {
    this.listenTo(this.model, "all", this.render);
    this.listenTo(this.model.reviews(), "all", this.render);
    this.listenTo(this.model.favorites(), "all", this.render);
  },
  
  handleFavorite: function (event) {
    event.preventDefault();
    var that = this;
    if (this.model.favoriteUsers().get(YelpClone.currentUserId)) {
      var a = this.model.favorites().findWhere({
        "user_id": YelpClone.currentUserId,
        "location_id": that.model.id
      });
      a.destroy();
    } else {
      var params = { "favorite": { "location_id": $(event.currentTarget).data("id") } };
      var favorite = new YelpClone.Models.Favorite(params);
      var that =  this;
      favorite.save({}, {
        success: function () {
          that.model.fetch();
        }
      }); 
    }
  },
  
  averageStars: function () {
    return Math.round(this.model.get("average_stars") * 2) / 2;
  },
  
  //TODO: add half stars
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    var $currentStars = this.$(".average-stars");
    var starsToEdit = [];
    var i = 1;
    while (starsToEdit.length < Math.floor(this.averageStars())) {
      $currentStar = $currentStars.find("[data-star-id='" + String(i) + "']");
      starsToEdit.push($currentStar);
      i++;
    }
    if (this.averageStars() % 1 === 0.5) {
      $currentStar = $currentStars.find("[data-star-id='" + String(i) + "']");
      starsToEdit.push($currentStar);
      $currentStar.addClass("half-star")
    }
    
    var that = this;
    starsToEdit.forEach( function (star) {
      star.addClass("stars-selected-" + Math.floor(that.averageStars()));
    });
    
    return this;
  }
}); 