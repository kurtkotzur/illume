YelpClone.Views.LocationIndexShow = Backbone.View.extend({
  template: JST["location_index_show"],
  
  className: "thumbnail location-index-show hidden",
  
  initialize: function () {
    this.listenTo(this.model, 'highlight-on', this.highlightOn);
    this.listenTo(this.model, 'highlight-off', this.highlightOff);
  },
  
  events: {
    "mouseenter img": "handleMouseEnter",
    "mouseleave img": "handleMouseLeave"
  },
  
  handleMouseEnter: function () {
    this.model.trigger("mouseEnter", this.model);
  },
  
  handleMouseLeave: function () {
    this.model.trigger("mouseLeave", this.model);
  },
  
  highlightOn: function () {
    $("img#" + this.model.get("id")).parent().parent().addClass("wide-highlighted");
  },
  
  highlightOff: function () {
    $("img#" + this.model.get("id")).parent().parent().removeClass("wide-highlighted");
  },
  
  render: function () {
    var renderedContent = this.template({ location: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});