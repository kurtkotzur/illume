YelpClone.Views.LocationNew = Backbone.View.extend({
  template: JST["location_new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.collection.create(this.model, {
      success: function (data) {
        console.log(data);
        Backbone.history.navigate("#/locations/" + data["id"]);
      },
      error: function () {
        console.log("location creation unsuccessful");
      }
    });
  }
});