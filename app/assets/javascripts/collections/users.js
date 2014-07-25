YelpClone.Collections.Users = Backbone.Collection.extend({
  model: YelpClone.Models.User,
  
  url: "/users",
  
  getOrFetch: function (id) {
    var users = this;
    
    var user;
    if (!(user = this.get(id))) {
      user = new YelpClone.Models.User({ id: id });
      user.fetch({
        sucess: function () { users.add(user); }
      });
    }
    return user;
  }
});

YelpClone.Collections.users = new YelpClone.Collections.Users();