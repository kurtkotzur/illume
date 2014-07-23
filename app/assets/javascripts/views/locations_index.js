YelpClone.Views.LocationsIndex = Backbone.View.extend({
  template: JST["locations_index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add reset remove", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ locations: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
});