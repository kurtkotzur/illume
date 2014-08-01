YelpClone.Views.LocationNew = Backbone.View.extend({
  template: JST["location_new"],
  
  events: {
    "submit form": "submit",
    "change input.picture-upload": "upload_picture"
  },
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["location"];
    this.model.set(params);
    var that = this;
    this.collection.create(this.model, {
      success: function (data) {
        Backbone.history.navigate("#/locations/" + data["id"]);
      },
      error: function () {
        console.log("location creation unsuccessful");
      }
    });
  },
  
  upload_picture: function (event) {
    var picture = event.currentTarget.files[0];
    var reader = new FileReader();
    var that = this;
    reader.onload = function (e) {
      that.model.set("location_photo", e.target.result);
    }
    reader.readAsDataURL(picture);
  }
});