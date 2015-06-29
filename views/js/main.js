//creates a confined area for pizza to inhabit
var canvasWidth = document.querySelector("#movingPizzas1").offsetWidth;

if (canvasWidth < 350) {
	cols = 2;
}else if (canvasWidth > 450 && canvasWidth < 800) {
	cols = 3;
}else{
	cols = 8;
}

//starts scroll information
var lastKnownScrollY = 4;
var canvasLeftEdge = document.querySelector(".container").offsetLeft;
var ticking = false;


// runs updatePositions on scroll
window.addEventListener('scroll', onScroll);

//captures scroll information
function onScroll() {
	lastKnownScrollY = window.scrollY;
	requestTick();
}

//animates bg pizzas on scroll
function requestTick() {
	if (!ticking) {
		requestAnimationFrame(updatePositions);
	}
	ticking = true;
}

// Moves the sliding background pizzas based on scroll position
function updatePositions(cols) {
	var currentScrollY = lastKnownScrollY;
	var items = document.getElementsByClassName("mover");
	for (var i = 0; i < items.length; i++) {
		var phase = Math.sin((currentScrollY / 50000) + (i % 5) -100);
		items[i].style.transform = "translateX(" + 320 * phase + "px)";
	}
	ticking = false;
}

//ensures pizzas start being drawn near the left side of the .container
window.addEventListener("resize", function(){
	canvasLeftEdge = document.querySelector(".container").offsetLeft;
});

// Generates the sliding pizzas when the page loads.
var s = 256;
for (var i = 0; i < 400; i++) {
	var elem = document.createElement('img');
	elem.basicLeft = ((i % cols) * s )+ canvasLeftEdge;
	elem.className = 'mover';
	elem.src = "images/conformed/pizza.png";
	elem.style.height = "100px";
	elem.style.width = "73.333px";
	elem.style.top = (Math.floor(i / cols) * s) + 'px';
	document.querySelector("#movingPizzas1").appendChild(elem);
	updatePositions();
}

