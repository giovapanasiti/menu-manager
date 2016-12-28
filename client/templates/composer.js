Template.composer.helpers({
  categories: function(){
    return Category.find();
  },
  recipes: function(){
    var cId = Template.parentData(0)._id
    return Recipe.find({"categoryId": cId});
  }
});

Template.composer.events({
  'click .setActive'() {
    // Set the checked property to the opposite of its current value
    Recipe.update(this._id, {
      $set: { isActive: ! this.checked },
      
    });
  },
});
