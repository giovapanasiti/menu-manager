Recipe = new Mongo.Collection('recipe');

Recipe.helpers({
  category: function(){
    return Category.findOne(this.categoryId);
  }
});
