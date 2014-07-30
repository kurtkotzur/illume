YelpClone.Views.IndexMap = Backbone.View.extend({
  id: "map-canvas", //may have to change
  
  template: JST["index_map"],
  
  mapInitialize: function () {
    var mapOptions = {
      center: new google.maps.LatLng(37.781056, -122.411455),
      zoom: 13
    };
    var map = new google.maps.Map(this.$el[0], mapOptions);
    
    var locationMarkers = [];
    var infoWindows = [];
    var iterator = 0;

    var that = this;
    function drop () {
      for (var i = 0; i < that.collection.models.length; i++) {
        window.setTimeout(function () {
          addMarker();
        }, (i + 1) * 200);
      }
    }
    
    function addMarker () {
      var current = that.collection.models[iterator];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(current.get("latitude"), current.get("longitude")),
        map: map,
        animation: google.maps.Animation.DROP
      });
      locationMarkers.push(marker);
      var infoWindow = new google.maps.InfoWindow({
        content: that.template({ location: current })
      });
      infoWindows.push(infoWindow);
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map, marker);
      });
      iterator++;
    }
    
    drop();
  },
  
  render: function () {
    window.setTimeout(this.mapInitialize.bind(this), 10);
    
    return this;
  }
})