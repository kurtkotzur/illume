YelpClone.Views.UserMap = Backbone.View.extend({
  template: JST["user_map"],
  
  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});