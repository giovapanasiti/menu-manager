Category.allow({
  'insert': function(doc){
    return true;
  }
});

Meteor.methods({
  addCategory: function(category){
    var exists = Category.findOne({name: category.nameIt})
    if (!exists) {
      return Category.insert(category);
      console.log('dal metodo server: inserito');
    }
  },
  category:  function(){
    return Category.find({});
  },
});
