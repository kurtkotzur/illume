YelpClone.Views.CategoryIndex = Backbone.View.extend({
  template: JST["category_index"],
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
});