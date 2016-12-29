


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

      Meteor.call('render.pdf', document.body, function(){
        console.log('pdf method triggered');
      });

      // setTimeout(function () {
      //
      //   require ('../plugins/_jspdf.debug.js');
      //   require ('../plugins/_html2pdf.js');
      //   require ('../plugins/_html2canvas.js');
      //   require ('../plugins/_jspdf.min.js');
      //
      //   // var pdf = new jsPDF('p', 'pt', 'a4');
      //
      //   // var canvas = document.getElementById('textarea');
      //   // console.log(canvas);
      //   // canvas.width = 72 * 8.5;
      //   // canvas.height = 72 * 11;
      //   // pdf = new jsPDF('p', 'pt','a4');
      //   // console.log(pdf);
      //   // pageHeight = pdf.internal.pageSize.height;
      //   // console.log(pageHeight);
      //   // var testo = document.getElementById('menu-completo');
      //   // var pdfPart1 = document.getElementById('menu1');
      //   // var pdfPart2 = document.getElementById('menu2');
      //   // var pageHeight= pdf.internal.pageSize.height
      //   //
      //   // // y = 500 // Height position of new content
      //   // // if (y >= pageHeight)
      //   // // {
      //   // //   pdf.addPage();
      //   // //   y = 0 // Restart height position
      //   // // }
      //   // // html2pdf(testo, pdf, function(pdf){
      //   // //   var iframe = document.createElement('iframe');
      //   // //   iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
      //   // //   testo.appendChild(iframe);
      //   // //   iframe.src = pdf.output('datauristring');
	    //   // //  });
      //   // pdf.fromHTML( testo ,function() {
      //   //     // pdf.output('datauri');
      //   //     console.log(pdf, 'inside function fromHTML');
      //   //      pdf.output('web.pdf');
      //   // });
      //   var menu = document.getElementById('menu-completo');
      //   var pdf = new jsPDF('p', 'pt', 'a4');
      //   var page1 = document.getElementById('menu1');
      //   var page2 = document.getElementById('menu2');
      //   var pages = [page1, page2];
      //
      //   pdf.output(pages, 'web.pdf');
      //
      //
      //
      //   // html2canvas(testo, canvas, {
      //   //     onrendered: function(canvas) {
      //   //         var iframe = document.createElement('iframe');
      //   //         console.log("2");
      //   //         iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
      //   //         console.log("3");
      //   //         testo.appendChild(iframe);
      //   //         iframe.src = pdf.output('datauristring');
      //   //        //var div = document.createElement('pre');
      //   //        //div.innerText=pdf.output();
      //   //        //document.body.appendChild(div);
      //   //     }
      //   // });
      // }, 10);

  }

});
