YelpClone.Collections.Locations = Backbone.Collection.extend({
  model: YelpClone.Models.Location,
  
  url: "/api/locations",
  
  getOrFetch: function (id) {
    var locations = this;
    
    var location;
    if (!(location = this.get(id))) {
      location = new YelpClone.Models.Location({ id: id });
      locations.fetch({
        sucess: function () { locations.add(location); }
      });
    }
    return location;
  }
});

YelpClone.Collections.locations = new YelpClone.Collections.Locations();