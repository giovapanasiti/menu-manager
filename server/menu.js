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
  'render.pdf': function(menu){
    // console.log('######################################### from server method')
    // var doc = new PDFDocument({size: 'A4', margin: 50});
    // // console.log(doc)
    // console.log('######################################### from server method')
    // SSR.compileTemplate('menuPrivate', Assets.getText('menuPrivate.html'));
    // console.log('######################################### from server method')
    // var html = SSR.render("menuPrivate");
    // console.log('######################################### from server method')
    // doc.fontSize(12);
    // doc.text(html, 10, 30, {align: 'center', width: 200});
    // console.log('######################################### from server method 2')
    var fs = Npm.require('fs');
    var fsPath = require('fs-path');


    console.log('######################################### from server method 1')
    var html = SSR.render("menuPrivate");
    console.log('######################################### from server method 2')
    var pdfStream = wkhtmltopdf(html);

    function categories(){
        return Category.find({}, {sort: {categoryOrder: 1}});
    }
    console.log('######################################### from server method 3')
    wkhtmltopdf(html, function(code, signal) {
      console.log('######################################### from server method 4')
        console.log('worked!');
        var content= fs.readFileSync('out.pdf')
        fsPath.writeFile('../../../../../public/out.pdf', content, function(err){
          if(err) {
            throw err;
          } else {
            console.log('wrote a file like DaVinci drew machines');
            console.log('')
          }
        });
        console.log('######################################### from server method 5')
    }).pipe(fs.createWriteStream('out.pdf'));
    console.log('######################################### from server method 6')
    // Save it on myApp/public/pdf folder (or any place) with the Fibered sync methode:
    // doc.writeSync(process.env.PWD + '/public/pdf/PDFKitExample.pdf');
    // doc.writeSync(process.env.PWD + '/public/menu.pdf');
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
