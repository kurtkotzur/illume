YelpClone.Views.UserMap = Backbone.View.extend({
  id: "map-canvas",
  
  mapInitialize: function () {
    var userPosition = new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude"))
    
    var mapOptions = {
      center: userPosition,
      zoom: 13
    };
    var map = new google.maps.Map(this.$el[0],
        mapOptions);
        
    var marker = new google.maps.Marker({
      position: userPosition,
      map: map,
      title: "Hello world!",
      animation: google.maps.Animation.DROP
    });
  },
  
  render: function () {
    window.setTimeout(this.mapInitialize.bind(this), 10);
    
    return this;
  }
});