YelpClone.Views.LocationShow = Backbone.CompositeView.extend({
  template: JST["location_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "add", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    
    var reviewNewView = new YelpClone.Views.ReviewNew({ model: this.model });
    this.addSubview(".review-new", reviewNewView);
    
    this.model.reviews().each(this.addReview.bind(this));
  },
  
  addReview: function (review) {
    var subview = new YelpClone.Views.ReviewShow({ model: review });
    this.subviews(".reviews").push(subview);
    this.$(".reviews").prepend(subview.render().$el);
    subview.delegateEvents();
  },
  
  averageStars: function () {
    return Math.round(this.model.get("average_stars") * 2) / 2;
  },
  
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
    
    this.attachSubviews();
    
    return this;
  }
});