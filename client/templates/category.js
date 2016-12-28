Template.category.events({
  'click .addCategory':function(event, template){
    event.preventDefault();
    var category = {};
    category.nameIt = template.find('#categoryNameIt').value;
    category.nameEn = template.find('#categoryNameEn').value;
    category.nameDe = template.find('#categoryNameDe').value;
    category.nameFr = template.find('#categoryNameFr').value;
    category.created_at = new Date();


    Meteor.call('addCategory', category, function(){
      
      $('#addCategoryForm')[0].reset();
    });
    // addCategory method is defined in server/methods/category.js
  }
});
