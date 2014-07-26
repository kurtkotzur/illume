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
  
  // showCategory: function(event) {
//     var cat = $(event.target).data('cat-name');
//     YelpClone.Collections.locations.fetch({data: {category: cat}, });
//   },
//TODO: implement above function in CategoriesIndex view. view has event handlers for buttons
//indicating different categories. said buttons have data-id attributes indicating their 
//categories. handlers initiate fectches that send the attributes to the Rails index method
//in the above format
  
  render: function () {
    var renderedContent = this.template({ locations: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
});