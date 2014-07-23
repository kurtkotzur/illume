window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new YelpClone.Routers.SiteRouter({ $rootEl: $("#main") });
    Backbone.history.start();
  }
};
