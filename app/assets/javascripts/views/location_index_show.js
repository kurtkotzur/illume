YelpClone.Views.LocationIndexShow = Backbone.View.extend({
  template: JST["location_index_show"],
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});