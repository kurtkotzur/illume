YelpClone.Views.LocationsIndex = Backbone.CompositeView.extend({
  template: JST["locations_index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add reset remove", this.render);
    this.listenTo(this.collection, "add", this.addLocation);
    this.collection.each(this.addLocation.bind(this));
  },
  
  addLocation: function (location) {
    var locationShow = new YelpClone.Views.LocationIndexShow({ model: location });
    this.addSubview(".locations", locationShow)
  },
  
  render: function () {
    var renderedContent = this.template({ locations: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
});