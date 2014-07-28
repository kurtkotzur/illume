YelpClone.Views.LocationShow = Backbone.CompositeView.extend({
  template: JST["location_show"],
  
  initialize: function () {
    var reviewNewView = new YelpClone.Views.ReviewNew({ model: this.model });
    this.addSubview(".review-new", reviewNewView);
    
    var locationInfoView = new YelpClone.Views.LocationInfo({ model: this.model });
    this.addSubview(".location-info", locationInfoView);
    
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.model.reviews().each(this.addReview.bind(this));
    
    this.listenTo(this.model.favoriteUsers(), "add", this.addFavoriteUser);
    this.model.favoriteUsers().each(this.addFavoriteUser.bind(this));
  },
  
  addFavoriteUser: function (favoriteUser) {
    var subview = new YelpClone.Views.LocationFavoriteShow({ model: favoriteUser });
    this.subviews(".favorite_users").push(subview);
    this.$(".favorite_users").prepend(subview.render().$el);
    subview.delegateEvents();
  },
  
  addReview: function (review) {
    var subview = new YelpClone.Views.ReviewShow({ model: review });
    this.subviews(".reviews").push(subview);
    this.$(".reviews").prepend(subview.render().$el);
    subview.delegateEvents();
  },
  
  render: function () { 
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
});