import '../plugins/_html2pdf.js';
import '../plugins/html2canvas.js';
import '../plugins/jspdf.min.js'


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


        var pdf = new jsPDF('p', 'pt', 'a4');
        console.log(pdf);
        // var canvas = document.getElementById('textarea');
        // console.log(canvas);
        // canvas.width = 72 * 8.5;
        // canvas.height = 72 * 11;
        var testo = document.getElementById('menu-completo');
        var pdfPart1 = document.getElementById('menu1');
        var pdfPart2 = document.getElementById('menu2');
        var pageHeight= pdf.internal.pageSize.height

        // html2pdf(testo, pdf, function(pdf){
        //   var iframe = document.createElement('iframe');
        //   iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
        //   testo.appendChild(iframe);
        //   iframe.src = pdf.output('datauristring');
	      //  });
        pdf.fromHTML( #qualcosa# ,function() {
            // pdf.output('datauri');
             pdf.output('web.pdf');
        });

        // html2canvas(testo, canvas, {
        //     onrendered: function(canvas) {
        //         var iframe = document.createElement('iframe');
        //         console.log("2");
        //         iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
        //         console.log("3");
        //         testo.appendChild(iframe);
        //         iframe.src = pdf.output('datauristring');
        //        //var div = document.createElement('pre');
        //        //div.innerText=pdf.output();
        //        //document.body.appendChild(div);
        //     }
        // });
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
