YelpClone.Routers.SiteRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    "locations": "locationsIndex",
    "locations/new": "locationNew",
    "locations/:id": "locationShow",
    "users/:id": "userShow",
    "": "categoryIndex"
  },
  
  categoryIndex: function () {
    var categoryIndexView = new YelpClone.Views.CategoryIndex();
    this._swapView(categoryIndexView);
  },
  
  locationsIndex: function () {
    // YelpClone.Collections.locations.fetch();
    debugger
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
    location.fetch();
    var locationShowView = new YelpClone.Views.LocationShow({ model: location });
    this._swapView(locationShowView);
  },
  
  userShow: function (id) {
    var user = YelpClone.Collections.users.getOrFetch(id);
    var userShowView = new YelpClone.Views.UserShow({ model: user });
    this._swapView(userShowView);
  },
  
  _swapView: function (newView) {
    this.currentView && this.currentView.remove();
    this.$rootEl.html(newView.render().$el);
    this.currentView = newView;
  }
});