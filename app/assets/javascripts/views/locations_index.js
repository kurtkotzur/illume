YelpClone.Views.LocationsIndex = Backbone.CompositeView.extend({
  template: JST["locations_index"],
  
  events: {
    "submit form": "submit",
    "change input.picture-upload": "upload_picture"
  },
  
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
  },
  
  submit: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["location"];
    this.model.set(params);
    this.collection.create(this.model, {
      success: function (data) {
        $(".modal-backdrop").remove();
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