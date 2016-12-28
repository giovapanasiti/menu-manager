
Template.recipeManager.events({
  'click .addRecipe': function(evt, tmpl){
    evt.preventDefault();
    var recipe = {};
    recipe.nameIt = tmpl.find('#recipeNameIt').value;
    recipe.nameFr = tmpl.find('#recipeNameFr').value;
    recipe.nameDe = tmpl.find('#recipeNameDe').value;
    recipe.nameEn = tmpl.find('#recipeNameEn').value;
    recipe.categoryId = tmpl.find('#category').value;
    recipe.isActive = false;
    recipe.lastUpdate = new Date();
    console.log('Adding');
    Meteor.call('Recipe.insert', recipe, function(){
      console.log('Added');
      $('#addRecipeForm')[0].reset();
      $('#recipeNameIt').focus();
    });
  }
});


Template.recipeManager.helpers({
  categories:function(){
    return Category.find();
  },
  category:function(){
    var categoryId = Category.findOne({name:nameIt})._id;
    return Category.findOne(this.categoryId);
  }
})
