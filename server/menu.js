SSR.compileTemplate('menuPrivate', Assets.getText('menuPrivate.html'));
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

Meteor.methods({

  // Create PDF
  // 'render.pdf': function(menu){

  //   var fs = Npm.require('fs');
  //   var fsPath = require('fs-path');

  //   console.log('######################################### from server method 1 [BEGIN]');
  //   var html = SSR.render("menuPrivate");
  //   console.log('######################################### from server method 2 [RENDER HTML ON SERVER]');
  //   var pdfStream = wkhtmltopdf(html);

  //   function categories(){
  //       return Category.find({}, {sort: {categoryOrder: 1}});
  //   }
  //   console.log('######################################### from server method 3 [START wkhtmltopdf]');
  //   wkhtmltopdf(html, function(code, signal) {
  //     console.log('######################################### from server method 4 [INSIDE wkhtmltopdf]');
  //       console.log('worked!');
  //       var content= fs.readFileSync('out.pdf');
  //       fsPath.writeFile('../../../../../public/out.pdf', content, function(err){
  //         if(err) {
  //           throw err;
  //         } else {
  //           console.log('**************** File created ****************');
  //           console.log('')
  //         }
  //       });
  //       console.log('######################################### from server method 5 [BEFORE CREATING OUTPUT FILE]');
  //   }).pipe(fs.createWriteStream('out.pdf'));
  //   console.log('######################################### from server method 6 [FINISH - PDF CREATED]');
  // },

  'rendera.pdf': (menu) => {
    console.log('######################################### 1');
    let dataContext = {
      categories: () => {
        Category.find({}, {sort: {categoryOrder: 1}});
      }
    }
    // let html = SSR.compileTemplate('menuPrivate', Assets.getText('menuPrivate.html'));
    let html = Spacebars.toHTML( dataContext, Assets.getText('menuPrivate.html') );
    console.log('######################################### 2')
    // generate file name and path
    let filePath;
    let filename = `menu.html`;
    console.log('######################################### 3 define file name')
    if ( process.env.NODE_ENV === 'development' ) {
      filePath = '/tmp/' + filename;
    } else {
      let path = Npm.require('path');
      filePath = path.join( process.env.TEMP_DIR, filename );
    }
    console.log('######################################### 4 saved')
    // write html to file
    let fs = Npm.require('fs');
    let writeFileSync = Meteor.wrapAsync( fs.writeFile );
    try {
      writeFileSync( filePath, html );
    } catch ( error ) {
      console.log( 'Error writing html to file:');
      console.log( error );
    }
    console.log('######################################### 5 saved')
    console.log('#########################################', filePath)
    // call phantom to render pdf from html
    let childProcess = Npm.require('child_process');
    console.log('######################################### 6')
    let cmd = 'phantomjs assets/app/phantom-driver.js ' + filePath;
    console.log('######################################### 7')
    let execSync = Meteor.wrapAsync( childProcess.exec );
    console.log('######################################### 8', cmd)    
    console.log('######################################### 8', execSync)    
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
