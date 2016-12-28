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
  'Category.remove':function(id){
    return Category.remove({_id: id});
  },
  category:  function(){
    return Category.find({});
  },
});
