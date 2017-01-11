Meteor.methods({
  'rendera.pdf': (menu) => {
    console.log('######################################### 1');
    let dataContext = {
      categories: function() {
        return Category.find({}, {sort: {categoryOrder: 1}});
      },
      categoryId: function(){
        return Category.find({nameIt:'Antipasti'})._id
      },
      recipes1: function(categoryname){
        var categoryId = Category.findOne({categoryOrder:1})._id;
        // {categoryId:categoryId &and isActive:true}
        return Recipe.find({ $and: [ { categoryId:categoryId },{ isActive:true }] });
       },
       recipes2: function(categoryname){
        var categoryId = Category.findOne({categoryOrder:2})._id;
        // {categoryId:categoryId &and isActive:true}
        return Recipe.find({ $and: [ { categoryId:categoryId },{ isActive:true }] });
       },
       recipes3: function(categoryname){
        var categoryId = Category.findOne({categoryOrder:3})._id;
        // {categoryId:categoryId &and isActive:true}
        return Recipe.find({ $and: [ { categoryId:categoryId },{ isActive:true }] });
       },
       recipes4: function(categoryname){
        var categoryId = Category.findOne({categoryOrder:4})._id;
        // {categoryId:categoryId &and isActive:true}
        return Recipe.find({ $and: [ { categoryId:categoryId },{ isActive:true }] });
       },
       recipes5: function(categoryname){
        var categoryId = Category.findOne({categoryOrder:5})._id;
        // {categoryId:categoryId &and isActive:true}
        return Recipe.find({ $and: [ { categoryId:categoryId },{ isActive:true }] });
       },
       

    }
let fs = Npm.require('fs');

    //function will check if a directory exists, and create it if it doesn't
function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}



    // let html = SSR.compileTemplate('menuPrivate', Assets.getText('menuPrivate.html'));
    let html = Spacebars.toHTML( dataContext, Assets.getText('menuPrivate.html') );
    console.log('######################################### 2')
    // generate file name and path
    let filePath;
    let filename = `menu.html`;
    console.log('######################################### 3 define file name');
     
    checkDirectorySync("/tmp/giovanni");  
    if ( process.env.NODE_ENV === 'development' ) {
      filePath = '/tmp/giovanni/' + filename;
    } else {
      let path = Npm.require('path');
      filePath = path.join( process.env.TEMP_DIR, filename );
    }

    console.log('######################################### 4 saved', filePath);
    // write html to file
    
    let writeFileSync = Meteor.wrapAsync( fs.writeFile );
    try {
      writeFileSync( filePath, html );
    } catch ( error ) {
      console.log( 'Error writing html to file:');
      console.log( error );
    }
    console.log('######################################### 5 saved');
    console.log('#########################################', filePath);
    // call phantom to render pdf from html
    let childProcess = Npm.require('child_process');
    console.log('######################################### 6');
    let cmd = 'phantomjs assets/app/phantom-driver.js ' + filePath;
    console.log('######################################### 7');
    let execSync = Meteor.wrapAsync( childProcess.exec );
    console.log('######################################### 8', cmd);  
    try {
      execSync( cmd );
      console.log('######################################### 9 cmd');
    } catch ( error ) {
      console.log( 'Error phantomjs:');
      console.log( error );
    }



    // // attach pdf to email
    //   console.log('######################################### 10');
    
    // email.attachments = [{
    //   fileName: `menu.pdf`,
    //   filePath: filePath.replace('.html', '.pdf'),
    // }];

    //   console.log('######################################### 11 cmd');
    

    // // and send the email
    // Email.send( email );

  },


  'look.pdf':function(){
  	var fstream = Npm.require('fs');
  	filename = 'public/out.pdf';
  	response = this.response;
  	filestream;
    console.log('######################################### from LOOK server')
    console.log(filestream)

  	if (!fstream.existsSync(filename)) {
  		console.log('router image not found', filename);
  		return [404];
  	}

  	return [200, fstream.readFileSync(filename)];
    }
});
