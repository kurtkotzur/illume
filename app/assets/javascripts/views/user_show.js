YelpClone.Views.UserShow = Backbone.View.extend({
  template: JST["user_show"],
  
  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
})