
Template.menuPrivate.helpers({
  categories: function(){
    return Category.find({}, {sort: {categoryOrder: 1}});
  },
  recipes: function(){
    var cId = Template.parentData(0)._id
    return Recipe.find({"categoryId": cId, "isActive": true});
    // This allow in the menu only those recipes with "isActive = true"
  },
  timeAgo: function(date){
    var DataOggi = new Date();
    console.log(DataOggi, this.lastUpdate)
    return DataOggi - this.lastUpdate ;
  },
  time: function(time){
    return moment(time).format("DD/MM/YYYY");
  }
});
