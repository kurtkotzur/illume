YelpClone.Views.ReviewNew = Backbone.View.extend({
  template: JST["review_new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({ review: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
  }
});