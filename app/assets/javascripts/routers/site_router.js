YelpClone.Routers.SiteRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    "": "locationsIndex",
    "locations/new": "locationNew",
    "locations/:id": "locationShow"
  },
  
  locationsIndex: function () {
    YelpClone.Collections.locations.fetch();
    var locationsIndexView = new YelpClone.Views.LocationsIndex({
      collection: YelpClone.Collections.locations
    });
    this._swapView(locationsIndexView);
  },
  
  locationNew: function () {
    var location = new YelpClone.Models.Location();
    var locations = YelpClone.Collections.locations;
    var locationNewView = new YelpClone.Views.LocationNew({ model: location, collection: locations });
    this._swapView(locationNewView);
  },
  
  locationShow: function (id) {
    var location = YelpClone.Collections.locations.getOrFetch(id);
    var locationShowView = new YelpClone.Views.LocationShow({ model: location });
    this._swapView(locationShowView);
  },
  
  _swapView: function (newView) {
    this.currentView && this.currentView.remove();
    this.$rootEl.html(newView.render().$el);
    this.currentView = newView;
  }
});