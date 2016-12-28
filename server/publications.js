Meteor.publish('category', function(){
  return Category.find({});
  // If I specify some parameters here for example name: 'category 2'
  // the user won't be able to access the other contents from neother
  // the page nor the console.
  // If I limit searches with parameters in the helper instead
  // only the "view" is limited but a user can still access the
  // db from the console
});

Meteor.startup(function(){
  Recipe._ensureIndex({"categoryId":1});
  // It should be faster to search for product after this
});

Meteor.publish('recipes', function(){
  return Recipe.find();
});

Meteor.publish('categoryRecipes', function(categoryname){
  var categoryId = Category.findOne({name:categoryname})._id;
  return Recipe.find({categoryId:categoryId});
});


Category.allow({
  'insert': function( doc){
    return true;
    // If a userId is not present it will return a false statmente not allowing the client to inserti
  }
});

Recipe.allow({
  'insert': function( doc){
    return true;
    // If a userId is not present it will return a false statmente not allowing the client to inserti
  }
});
