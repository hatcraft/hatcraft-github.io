const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { series } = require('gulp');



function galleryData(cb) {

	let output = {};

	for(let file of readdirSync('./images/gallery', { encoding: "utf8" })) {

		let name = file.split(".")[0];

		if( !(name in output) )
			output[name] = {};


		if(/.+\.json/gim.test(file)) {
			// Data
			Object.assign(output[name], JSON.parse(readFileSync('images/gallery/' + file)));
		} else {
			// Image
			output[name].img = 'images/gallery/' + file;
		}

	}

	writeFileSync('./data/gallery.json', JSON.stringify(output, null, -4))

	cb()
}

exports.build = galleryData;
exports.default = series(galleryData);