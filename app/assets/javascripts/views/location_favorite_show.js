YelpClone.Views.LocationFavoriteShow = Backbone.View.extend({
  template: JST["location_favorite_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ favoriteUser: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});