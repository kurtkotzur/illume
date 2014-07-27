YelpClone.Views.LocationInfo = Backbone.View.extend({
  template: JST["location_info"],
  
  events: {
    "click button.add-favorite": "addFavorite"
  },
  
  initialize: function () {
    this.listenTo(this.model, "all", this.render);
  },
  
  addFavorite: function (event) {
    event.preventDefault();
    var params = { "favorite": { "location_id": $(event.currentTarget).data("id") } };
    var favorite = new YelpClone.Models.Favorite(params);
    
    favorite.save({}, {
      success: function () {
        console.log(favorite);
      }
    });
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
    
    var that = this;
    starsToEdit.forEach( function (star) {
      star.addClass("stars-selected-" + Math.floor(that.averageStars()));
    });
    
    return this;
  }
}); 