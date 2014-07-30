YelpClone.Views.LocationIndexShow = Backbone.View.extend({
  template: JST["location_index_show"],
  
  initialize: function () {
    this.listenTo(this.model, 'highlight-on', this.highlightOn);
    this.listenTo(this.model, 'highlight-off', this.highlightOff);
  },
  
  highlightOn: function () {
    this.$el.find(".location-index-show").addClass("wide-highlighted");
  },
  
  highlightOff: function () {
    this.$el.find(".location-index-show").removeClass("wide-highlighted");
  },
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});