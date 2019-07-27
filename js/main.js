const backgroundImageLength = 3;
var index = 1;

setInterval( () => {

	console.log("background update")

	let body = document.getElementsByTagName("body")[0];

	body.style.backgroundImage = `url('images/backgrounds/${index}.png')`

	if( ++index > backgroundImageLength )
		index = 0;
	
}, 10000);