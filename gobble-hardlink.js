var path = require("path");
var sander = require("sander");
var fs = require("fs");

module.exports = hardlink;

// Autoprefixer works with filenames for its sourcemaps, which means it needs to
// be a directory transformer.
function hardlink(inputdir, outputdir, options) {

	return sander.lsr( inputdir ).then( function ( allFiles ) {
		var ops = [];

		for (var i in allFiles) {
			var filename = allFiles[i];

			ops.push(new Promise(function(res){
				fs.linkSync(
					path.join(inputdir, filename),
					path.join(outputdir, filename),
					res
				);
			}));
		}

		return Promise.all(ops);
	});
}
