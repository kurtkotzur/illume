YelpClone.Views.LocationsIndex = Backbone.CompositeView.extend({
  
  className: "locations-index-el",
  
  template: JST["locations_index"],
  
  events: {
    "submit form": "submit",
    "change input.picture-upload": "upload_picture"
  },
  
  initialize: function (options) {
    index = this;
    this.params = options.params;
    this.listenTo(this.collection, "reset", this.addAllTiles);
    
    this.listenTo(this.collection, "mouseEnter", this.bounceLocation);
    this.listenTo(this.collection, "mouseLeave", this.unbounceLocation);
  },
  
  addAllTiles: function(){
    this.$('.spinner-row').remove();
    this.collection.each(this.addLocation.bind(this));
    this.gridaliciousize();
    this.indexMapView = new YelpClone.Views.IndexMap({ collection: this.collection });
    this.addSubview(".index-map", this.indexMapView);
  },
  
  bounceLocation: function (location) {
    if (this.indexMapView.locationMarkers[location.get("id")]) {
      this.indexMapView.locationMarkers[location.get("id")].setAnimation(google.maps.Animation.BOUNCE);
    }
  },
  
  unbounceLocation: function (location) {
    if (this.indexMapView.locationMarkers[location.get("id")]) {
      this.indexMapView.locationMarkers[location.get("id")].setAnimation(null);
    }
  },
  
  addLocation: function (location) {
    var locationShow = new YelpClone.Views.LocationIndexShow({ model: location });
    this.addSubview(".locations", locationShow);
  },
  
  gridaliciousize: function () {
    this.$(".hidden").removeClass("hidden");
    this.$el.find(".locations").gridalicious({
      selector: ".thumbnail",
      animate: true,
      gutter: 1,
      animationOptions: {
         speed: 150,
         duration: 400
      }
    });
  },
  
  render: function () {
    var parsedParams = this.parseParams();
    var renderedContent = this.template({ params: this.params, parsedParams: parsedParams });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    window.setTimeout(this.gridaliciousize.bind(this), 1);
    return this;
  },
  
  parseParams: function () {
    var result = "";
    var booleanParams = ["wifi", "wheelchair accessible", "good for kids", "good for groups", "outdoor"];
    for (var key in this.params) {
      if (key === "category") continue;
      var parsedKey = key.replace(/_/g, " ");
      result += parsedKey;
      if (booleanParams.indexOf(parsedKey) === -1) {
        result += ": ";
        result += this.params[key].toLowerCase();
      }
      result += ", ";
    }
    return result.substring(0, result.length - 2);
  },
  
  submit: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["location"];
    this.model.set(params);
    this.collection.create(this.model, {
      success: function (data) {
        $(".modal-backdrop").remove();
        $("#newLocationModal").modal('hide');
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