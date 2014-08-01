/*global YelpClone, google, JST */
YelpClone.Views.UserMap = Backbone.View.extend({
  id: "user-map-canvas",
  
  favoriteTemplate: JST["user_map_favorite"],
  
  reviewTemplate: JST["user_map_review"],
  
  initialize: function () {
    this.listenTo(this, "showUser", this.showUserMarker.bind(this));
    this.listenTo(this, "showReviews", this.showReviewMarkers.bind(this));
    this.listenTo(this, "showFavorites", this.showFavoriteMarkers.bind(this));
  },
  
  mapInitialize: function () {
    this.userPosition = new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude"));
    
    var mapOptions = {
      center: this.userPosition,
      zoom: 12
    };
    this.map = new google.maps.Map(this.$el[0], mapOptions);
    
    // this.showUserMarker();

  },
  
  showUserMarker: function () {
    for (var key in this.markers) {
      if (this.markers.hasOwnProperty(key)) {
        this.markers[key].setMap(null);
      }
    }
    this.markers = {};
    this.infoWindows = [];
    
    var marker = new google.maps.Marker({
      position: this.userPosition,
      map: this.map,
      animation: google.maps.Animation.DROP
    })
    
    this.markers["1"] = marker;
  },
  
  showFavoriteMarkers: function () {
    for (var key in this.markers) {
      if (this.markers.hasOwnProperty(key)) {
        this.markers[key].setMap(null);
      }
    }
    this.markers = {};
    this.infoWindows = [];
    
    var iterator = 0;
    
    var that = this;
    function drop () {
      for (var i = 0; i < that.model.favorites().models.length; i++) {
        window.setTimeout(function () {
          addMarker();
        }, i * 200);
      }
    }
    
    function addMarker () {
      var favorite = that.model.favorites().models[iterator];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(favorite.get("latitude"), favorite.get("longitude")),
        map: that.map,
        animation: google.maps.Animation.DROP
      });
      
      that.markers[favorite.get("id")] = marker;
      var infoWindow = new google.maps.InfoWindow({
        content: that.favoriteTemplate({ location: favorite }),
        maxWidth: 140
      });
      that.infoWindows.push(infoWindow);
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(that.map, marker);
        favorite.trigger("highlight-on");
      });
      google.maps.event.addListener(infoWindow, "closeclick", function () {
        favorite.trigger("highlight-off");
      })
      iterator++;
    }
    
    drop();
  },
  
  showReviewMarkers: function () {
    for (var key in this.markers) {
      if (this.markers.hasOwnProperty(key)) {
        this.markers[key].setMap(null);
      }
    }
    this.markers = {};
    this.infoWindows = [];
    
    var iterator = 0;
    
    var that = this;
    function drop () {
      for (var i = 0; i < that.model.reviews().models.length; i++) {
        window.setTimeout(function () {
          addMarker();
        }, i * 200);
      }
    }
    function addMarker () {
      var review = that.model.reviews().models[iterator];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(review.get("latitude"), review.get("longitude")),
        map: that.map,
        animation: google.maps.Animation.DROP
      });
      
      that.markers[review.get("id")] = marker;
      var infoWindow = new google.maps.InfoWindow({
        content: that.reviewTemplate({ review: review }),
        maxWidth: 140
      });
      that.infoWindows.push(infoWindow);
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(that.map, marker);
        review.trigger("highlight-on");
      });
      google.maps.event.addListener(infoWindow, "closeclick", function () {
        review.trigger("highlight-off");
      });
      iterator++;
    }
    drop();
  },
  
  render: function () {
    window.setTimeout(this.mapInitialize.bind(this), 10);
    
    return this;
  }
});