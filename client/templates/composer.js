import '../plugins/_html2pdf.js';
import '../plugins/html2canvas.js';
import '../plugins/jspdf.min.js'

function html2pdf (html,pdf,callback) {
	var canvas = pdf.canvas;
	if (!canvas) {
		alert('jsPDF canvas plugin not installed');
		return;
	}
	canvas.pdf = pdf;
	pdf.annotations = {

		_nameMap : [],

		createAnnotation : function(href,bounds) {
			var x = pdf.context2d._wrapX(bounds.left);
			var y = pdf.context2d._wrapY(bounds.top);
			var page = pdf.context2d._page(bounds.top);
			var options;
			var index = href.indexOf('#');
			if (index >= 0) {
				options = {
					name : href.substring(index + 1)
				};
			} else {
				options = {
					url : href
				};
			}
			pdf.link(x, y, bounds.right - bounds.left, bounds.bottom - bounds.top, options);
		},

		setName : function(name,bounds) {
			var x = pdf.context2d._wrapX(bounds.left);
			var y = pdf.context2d._wrapY(bounds.top);
			var page = pdf.context2d._page(bounds.top);
			this._nameMap[name] = {
				page : page,
				x : x,
				y : y
			};
		}

	};
	canvas.annotations = pdf.annotations;

	pdf.context2d._pageBreakAt = function(y) {
		this.pageBreaks.push(y);
	};

	pdf.context2d._gotoPage = function(pageOneBased) {
		while (pdf.internal.getNumberOfPages() < pageOneBased) {
			pdf.addPage();
		}
		pdf.setPage(pageOneBased);
	}

	if (typeof html === 'string') {
		// remove all scripts
		html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

		var iframe = document.createElement('iframe');
		//iframe.style.width = canvas.width;
		//iframe.src = "";
		//iframe.document.domain =
		document.body.appendChild(iframe);
		var doc;
		doc = iframe.contentDocument;
		if (doc == undefined || doc == null) {
			doc = iframe.contentWindow.document;
		}
		//iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');

		doc.open();
		doc.write(html);
		doc.close();

		var promise = html2canvas(doc.body, {
			canvas : canvas,
			onrendered : function(canvas) {
				if (callback) {
					if (iframe) {
						iframe.parentElement.removeChild(iframe);
					}
					callback(pdf);
				}
			}
		});

	} else {
		var body = html;
		var promise = html2canvas(body, {
			canvas : canvas,
			onrendered : function(canvas) {
				if (callback) {
					if (iframe) {
						iframe.parentElement.removeChild(iframe);
					}
					callback(pdf);
				}
			}
		});
	}

}


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


        var pdf = new jsPDF('p', 'pt', 'letter');
        console.log(pdf);
        // var canvas = document.getElementById('textarea');
        // console.log(canvas);
        // canvas.width = 72 * 8.5;
        // canvas.height = 72 * 11;
        var testo = document.getElementById('textarea');

        // html2pdf(testo, pdf, function(pdf){
        //   var iframe = document.createElement('iframe');
        //   iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
        //   testo.appendChild(iframe);
        //   iframe.src = pdf.output('datauristring');
	      //  });
        pdf.addHTML(testo,function() {
            pdf.output('datauri');
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
