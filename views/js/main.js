//limits amount of pizzas drawn
var canvasWidth = document.querySelector("#header").offsetWidth;
var canvasLeft = canvasWidth - (canvasWidth/2);

if (canvasWidth < 350) {
	var cols = 2;
}else if (canvasWidth > 450 && canvasWidth < 800) {
	var cols = 3;
}else{
	var cols = 8;
}

//starts scroll information
var lastKnownScrollY = 4;
var ticking = false;


// runs updatePositions on scroll
window.addEventListener("scroll", onScroll);

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
function updatePositions() {
	var currentScrollY = lastKnownScrollY;
	var items = document.getElementsByClassName("mover");
	for (var i = 0; i < items.length; i++) {
		var phase = Math.sin((currentScrollY / 30000) + (i % cols));
		items[i].style.transform = "translateX(" + 500 * (phase) + "px)";
	}
	ticking = false;
}

//Generates the sliding pizzas when the page loads.
var s = 256;
var multip = 300;
for (var i = 0; i < 80; i++) {
	var randNum = Math.floor((Math.random() * multip) + canvasLeft);
	var elem = document.createElement("img");
	elem.className = "mover";
	elem.src = "images/conformed/pizza.png";
	elem.style.height = "100px";
	elem.style.width = "73.333px";
	elem.style.top = (Math.floor(i / cols) * s) + "px";
	elem.style.left = randNum + "px";
	document.querySelector("#movingPizzas1").appendChild(elem);
	updatePositions();
}
