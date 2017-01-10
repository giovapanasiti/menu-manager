var page = Npm.require('webpage').create();
var system = Npm.require('system');
var fs = Npm.require('fs');

var filePath = system.args[1];
var html = fs.read( filePath );

page.content = html;
page.paperSize = {
  format: 'Letter',
  margin: '1cm'
};

page.onLoadFinished = function( status ) {
  // console.log('Status: ' + status);
  if (status !== 'success') {
    console.log('PhantomError: Unable to load the html!');
    phantom.exit(1);
  } else {
    page.render( filePath.replace('.html', '.pdf') );
    phantom.exit();
  }
};