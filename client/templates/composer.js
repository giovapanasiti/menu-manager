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

      FlowRouter.go('/menu');
      setTimeout(function () {
        import '../plugins/html2pdf.js';
        import '../plugins/html2canvas.js';

        var pdf = new jsPDF('p', 'pt', 'letter');
        console.log(pdf);
        var canvas = document.getElementById('textarea')
        console.log(canvas);
        canvas.width = 8.5 * 72;
        var testo = document.getElementById('textarea');
        html2canvas(testo, {
            canvas:canvas,
            onrendered: function(canvas) {
                var iframe = document.createElement('iframe');
                iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
                testo.appendChild(iframe);
                iframe.src = pdf.output('datauristring');
               //var div = document.createElement('pre');
               //div.innerText=pdf.output();
               //document.body.appendChild(div);
            }
        });
      }, 10);


  } //function event onClick

//   'click #generateMenu': function (e, tmpl) {
//     e.preventDefault();
//
//     Meteor.call('createPDF', function (err, res) {
//         if (err) {
//             console.error(err);
//         }
//         console.log(res);
//             zip.file("Hello.txt", "Hello World\n");
//             var img = zip.folder("images");
//             img.file("google.pdf", res, {base64: true});
//             var content = zip.generate({type: "blob"});
//             saveAs(content, "case.zip");
//     });
// }

});
