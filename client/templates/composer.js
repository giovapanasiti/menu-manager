


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

    // FlowRouter.go('/menu');

      Meteor.call('rendera.pdf', document.body, function(){
        console.log('pdf method triggered');
      });


  }

});
