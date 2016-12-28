Meteor.methods({
  'Recipe.insert': function(recipe){
    return Recipe.insert(recipe);
  },
  'Recipe.remove':function(id){
    return Recipe.remove({_id: id});
  }
});
