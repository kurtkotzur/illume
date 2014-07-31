YelpClone.Views.CategoryIndex = Backbone.View.extend({
  template: JST["category_index"],
  
  events: {
    "click div.category-icon-container": "filterLocations",
    "blur select": "addSelectParameter",
    "click [type='checkbox']": "addCheckParameter"
  },
  
  addCheckParameter: function (event) {
    this.params = this.params || {};
    var $checkbox = $(event.currentTarget);
    if ($checkbox.is(":checked")) {
      this.params[$checkbox.attr("id")] = true;
    } else {
      delete this.params[$checkbox.attr("id")];
    }
  },
  
  addSelectParameter: function (event) {
    var $input = $(event.currentTarget);
    this.params = this.params || {};
    this.params[$input.attr("id")] = $input.val();
  },
  
  filterLocations: function (event) {
    debugger
    this.params = this.params || {};
    this.params["category"] = $(event.currentTarget).data('cat');
    var that = this;
    YelpClone.Collections.locations.fetch({
      data: {filter_options: that.params},
      success: function () {
        if (that.params["category"]) {
          var parsedCategory = that.params["category"].replace(/ /g,"_");
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