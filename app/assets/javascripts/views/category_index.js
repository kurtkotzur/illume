YelpClone.Views.CategoryIndex = Backbone.View.extend({
  template: JST["category_index"],
  
  events: {
    "click div.category-icon-container": "filterLocations"
  },
  
  filterLocations: function (event) {
    var category = $(event.currentTarget).data('cat');
    YelpClone.Collections.locations.fetch({
      data: { category: category },
      success: function () {
        if (category) {
          var parsedCategory = category.replace(/ /g,"_");
          Backbone.history.navigate("#/locations/" + parsedCategory);
        } else {
          Backbone.history.navigate("#/locations");
        }
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
});