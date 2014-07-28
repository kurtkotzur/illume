YelpClone.Views.UserFavoriteShow = Backbone.View.extend({
  template: JST["user_favorite_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ favorite: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});