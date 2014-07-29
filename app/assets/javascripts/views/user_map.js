YelpClone.Views.UserMap = Backbone.View.extend({
  id: "map-canvas",
  
  template: JST["user_map"],
  
  mapInitialize: function () {
    var userPosition = new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude"));
    
    var mapOptions = {
      center: userPosition,
      zoom: 13
    };
    var map = new google.maps.Map(this.$el[0],
        mapOptions);
        
    var userMarker = new google.maps.Marker({
      position: userPosition,
      map: map,
      animation: google.maps.Animation.DROP
    });
    
    var favoriteMarkers = [];
    var infoWindows = [];
    var iterator = 0;
    
    var that = this;
    function drop() {
      for (var i = 0; i < that.model.favorites().models.length; i++) {
        window.setTimeout(function() {
          addMarker();
        }, (i + 1) * 200);
      }
    }

    function addMarker() {
      var favorite = that.model.favorites().models[iterator]
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(favorite.get("latitude"), favorite.get("longitude")),
        map: map,
        animation: google.maps.Animation.DROP
      });
      favoriteMarkers.push(marker);
      iterator++;
      var infoWindow = new google.maps.InfoWindow({
        content: that.template({ location: favorite })
      });
      infoWindows.push(infoWindow);
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map, marker);
      })
    }
    
    drop();

  },
  
  render: function () {
    window.setTimeout(this.mapInitialize.bind(this), 10);
    
    return this;
  }
});