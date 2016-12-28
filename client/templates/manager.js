Template.manager.helpers({
  categories: function(){
    return Category.find();
  },
  recipes: function(){
    return Recipe.find();
  }
});

Template.manager.events({
  'click .removeRecipe': function(evt, tmpl){
    Meteor.call('Recipe.remove', this._id);
  }
});
