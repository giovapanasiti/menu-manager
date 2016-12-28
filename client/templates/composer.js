Template.composer.helpers({
  categories: function(){
    return Category.find();
  },
  recipes: function(){
    var cId = Template.parentData(0)._id
    return Recipe.find({"categoryId": cId});
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

Template.composer.events({

  'click .isActiveTrue'(){
    Recipe.update(this._id, {
      $set: {
        isActive: true,
        lastUpdate: new Date()
      }
    })
  },
  'click .isActiveFalse'(){
    Recipe.update(this._id, {
      $set: {
        isActive: false
      }
    })
  },
  'click #generateMenu'(){
    Blaze.saveAsPDF(Template.menu, {
      filename: "Menu.pdf", // optional, default is "document.pdf"
      data: Template.menu, // optional, render the template with this data context
      x: 3, // optional, left starting position on resulting PDF, default is 4 units
      y: 3, // optional, top starting position on resulting PDF, default is 4 units
      unit: "cm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
      format: "a4" // optional, see Page Formats, default is "a4"
    });
  }

});
