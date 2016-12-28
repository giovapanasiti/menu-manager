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
  },
  // 'click .removeCategory': function(evt, tmpl){
  //   Meteor.call('Category.remove', this._id);
  // },

  // test
  'click .removeCategory':function(evt, tmpl){
    var categoryR = Category.findOne(this._id);
    new Confirmation({
      message: "Sei sicuro di voler cancellare? Non potrai più accedere ai piatti di questa categoria",
      title: "Confermi di voler cancellare?",
      cancelText: "Cancel",
      okText: "Si",
      success: false, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      console.log(ok);
      if (ok === true) {
        console.log('#Delete', categoryR)
        Meteor.call('Category.remove', categoryR._id);
      } else if (ok === false) {
        console.log('#Dont Delete!!!!')
      };
      //
    });
  }

});



Template.category.helpers({
  categories: function(){
    return Category.find();
  },
  recipes: function(){
    return Recipe.find();
  }
});
