YelpClone.Views.ReviewShow = Backbone.View.extend({
  template: JST["review_show"],
  
  render: function () {
    var renderedContent = this.template({ review: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
})