/*global YelpClone, google, JST */
YelpClone.Views.UserMap = Backbone.View.extend({
  id: "user-map-canvas",
  
  template: JST["user_map"],
  
  initialize: function () {
    this.listenTo(this, "showUser", this.showUserMarker.bind(this));
    this.listenTo(this, "showReviews", this.showReviewMarkers.bind(this));
    this.listenTo(this, "showFavorites", this.showFavoriteMarkers.bind(this));
  },
  
  mapInitialize: function () {
    this.userPosition = new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude"));
    
    var mapOptions = {
      center: this.userPosition,
      zoom: 13
    };
    this.map = new google.maps.Map(this.$el[0], mapOptions);
    
    this.showUserMarker();

  },
  
  showUserMarker: function () {
    _(this.markers).each( function (marker) {
      marker.setMap(null);
    });
    this.markers = [];
    this.infoWindows = [];
    
    var marker = new google.maps.Marker({
      position: this.userPosition,
      map: this.map,
      animation: google.maps.Animation.DROP
    })
    
    this.markers.push(marker);
  },
  
  showFavoriteMarkers: function () {
    _(this.markers).each( function (marker) {
      marker.setMap(null);
    });
    this.markers = [];
    this.infoWindows = [];
    
    var iterator = 0;
    
    var that = this;
    function drop () {
      for (var i = 0; i < that.model.favorites().models.length; i++) {
        window.setTimeout(function () {
          addMarker();
        }, (i + 1) * 200);
      }
    }
    
    function addMarker () {
      var favorite = that.model.favorites().models[iterator];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(favorite.get("latitude"), favorite.get("longitude")),
        map: that.map,
        animation: google.maps.Animation.DROP
      });
      debugger
      that.markers.push(marker);
      var infoWindow = new google.maps.InfoWindow({
        content: that.template({ location: favorite }),
        maxWidth: 150
      });
      that.infoWindows.push(infoWindow);
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(that.map, marker);
      });
      iterator++;
    }
    
    drop();
  },
  
  showReviewMarkers: function () {
    _(this.markers).each( function (marker) {
      marker.setMap(null);
    });
    this.markers = [];
    this.infoWindows = [];
    
    var iterator = 0;
    
    var that = this;
    function drop () {
      for (var i = 0; i < that.model.reviews().models.length; i++) {
        window.setTimeout(function () {
          addMarker();
        }, (i + 1) * 200);
      }
    }
    // debugger
    function addMarker () {
      var review = that.model.reviews().models[iterator];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(review.get("latitude"), review.get("longitude")),
        map: that.map,
        animation: google.maps.Animation.DROP
      });
      that.markers.push(marker);
      // var infoWindow = new google.maps.InfoWindow({
//         content: that.template({ location: review })
//       });
//       this.infoWindows.push(infoWindow);
//       google.maps.event.addListener(marker, "click", function () {
//         infoWindow.open(map, marker);
//       });
      iterator++;
    }
    
    drop();
  },
  
  render: function () {
    window.setTimeout(this.mapInitialize.bind(this), 10);
    
    return this;
  }
});