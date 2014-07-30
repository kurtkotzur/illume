YelpClone.Views.LocationsIndex = Backbone.CompositeView.extend({
  template: JST["locations_index"],
  
  events: {
    "submit form": "submit",
    "change input.picture-upload": "upload_picture"
  },
  
  initialize: function (options) {
    this.category = options.category;
    this.listenTo(this.collection, "add", this.addLocation);
    this.collection.each(this.addLocation.bind(this));
    
    var indexMapView = new YelpClone.Views.IndexMap({ collection: this.collection });
    this.addSubview(".index-map", indexMapView);
  },
  
  addLocation: function (location) {
    var locationShow = new YelpClone.Views.LocationIndexShow({ model: location });
    this.addSubview(".locations", locationShow)
  },
  
  render: function () {
    var renderedContent = this.template({ category: this.category });
    
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
        Backbone.history.navigate("#/location/" + data["id"]);
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