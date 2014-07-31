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
    this.params = this.params || {};
    var category = $(event.currentTarget).data('cat');
    if (category) {
      this.params["category"] = $(event.currentTarget).data('cat');
    }
    
    var that = this;
    YelpClone.Collections.locations.fetch({
      data: {filter_options: that.params},
      success: function () {
        Backbone.history.navigate("#/locations" + that.encodeParameters());
      }
    });
  },
  
  encodeParameters: function () {
    var result = "?";
    for (var key in this.params) {
      var parsedKey = key.replace(/ /g,"_");
      result += parsedKey;
      result += "=";
      parsedVal = String(this.params[key]).replace(/ /g,"_");
      result += parsedVal;
      result += "&";
    }
    return result.substring(0, result.length - 1);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
});