FlowRouter.route(['/', '/home'], {
  action: function(){
    FlowLayout.render('layout',{
      main: 'home',
    });
  }
});

FlowRouter.route(['/composer'], {
  subscriptions:function(params){
    this.register('categoriesList', Meteor.subscribe('category'));
    this.register('recipesList', Meteor.subscribe('recipes'));
    this.register('catproducts', Meteor.subscribe('categoryRecipes', params.categoryName));
  },
  action: function(){
    FlowLayout.render('layout',{
      main: 'composer',
    });
  }
});

FlowRouter.route(['/manager'], {
  subscriptions:function(params){

    this.register('categoriesList', Meteor.subscribe('category'));
    this.register('recipesList', Meteor.subscribe('recipes'));


    this.register('catproducts', Meteor.subscribe('categoryRecipes', params.categoryName));

  },
  action: function(){
    FlowLayout.render('layout',{
      main: 'manager',
    });
  }
});

FlowRouter.route('/menu', {
  subscriptions:function(params){
    this.register('categoriesList', Meteor.subscribe('category'));
    this.register('recipesList', Meteor.subscribe('recipes'));
    this.register('catproducts', Meteor.subscribe('categoryRecipes', params.categoryName));
  },
  action: function(){
    FlowLayout.render('print',{
      main: 'menu',
    });
  }
});
