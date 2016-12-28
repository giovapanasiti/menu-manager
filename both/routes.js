FlowRouter.route(['/', '/home'], {
  action: function(){
    FlowLayout.render('layout',{
      main: 'home',
    });
  }
});

FlowRouter.route(['/composer'], {
  action: function(){
    FlowLayout.render('layout',{
      main: 'composer',
    });
  }
});

FlowRouter.route(['/manager'], {
  action: function(){
    FlowLayout.render('layout',{
      main: 'manager',
    });
  }
});
