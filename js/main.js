const backgroundImageLength = 3;
var index = 1;

setInterval( () => {

	console.log("background update")

	let body = document.getElementsByTagName("body")[0];

	body.style.backgroundImage = `url('images/backgrounds/${index}.png')`

	if( ++index > backgroundImageLength - 1)
		index = 0;
	
}, 10000);


let galleryData = {};


async function buildGallery() {

	galleryData = (await axios.get('/data/gallery.json')).data

	let galleryEle = document.getElementById("gallery");
	galleryEle.innerHTML = '';

	for(let img of Object.keys(galleryData)) {
		galleryEle.innerHTML += `<div class="item"> <img src="${galleryData[img].img}"> </div>`
	}


	document.getElementsByClassName("container")[0].style.margin = "0"


}




async function updateContent() {

	var urlParams = new URLSearchParams(window.location.search);

	let pageKey = urlParams.has('page') ? urlParams.get('page') : 'home';
	let contentElement = document.getElementById('content')

	switch(pageKey) {
		case 'application':
			contentElement.innerHTML = (await axios.get('/pages/application.html')).data
			break;
		case 'gallery':
			contentElement.innerHTML = (await axios.get('/pages/gallery.html')).data
			buildGallery()
			break;
		case 'help':
			contentElement.innerHTML = (await axios.get('/pages/helpful.html')).data
			break;
		case 'donations':
			contentElement.innerHTML = (await axios.get('/pages/donations.html')).data
			break;
		default:
			contentElement.innerHTML = (await axios.get('/pages/home.html')).data
	}

}

async function navClick(event, page) {

	var searchParams = new URLSearchParams(window.location.search);

	searchParams.set("page", page);

	window.location.search = searchParams.toString();
}

updateContent()