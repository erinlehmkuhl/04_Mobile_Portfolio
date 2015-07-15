//divided JS into two files so that the critical information could be inlined
//this is the critical file. I grunt uglify it and then add it to my html file
//which is then run through grunt htmlmin

//limits amount of sliding pizzas drawn depending on the width of the screen
var canvasWidth = document.getElementsByClassName("container").offsetWidth;
var canvasLeft = canvasWidth - (canvasWidth/2);

if (canvasWidth < 350) {
	var cols = 3;
}else if (canvasWidth > 450 && canvasWidth < 800) {
	var cols = 5;
}else{
	var cols = 8;
}


//the whole system for animating the sliding pizzas is re-factored here
//there were too many forced syncro issues in the orginial code
//this captures the window information and hands if off when requested
//allowing requestAnimationFrame to front load each frame with JS

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
};



//******User Timing API******
// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

//******User Timing API******
// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
};



// Moves the sliding background pizzas based on scroll position
function updatePositions() {
	//******User Timing API******
	frame ++;
	window.performance.mark("mark_start_frame");

	//without querying the DOM, this asks for scroll info and moves the sliding pizzas
	var currentScrollY = lastKnownScrollY;
	var items = document.getElementsByClassName("mover");
	var howMany = items.length;
	for (var i = 0; i < howMany; i++) {
		var phase = Math.sin((currentScrollY / 30000) + (i % cols));
		//CSS Triggers: swapped all movement calls to 'transform.translate' 
		//this forced me to approximate the look that we had before since the math is completely different now
		items[i].style.transform = "translateX(" + 500 * (phase) + "px)";
	}
	ticking = false;

//******User Timing API******
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
};

//Generates the sliding pizzas when the page loads.
//there were way too many pizzas so a large improvement was to see how large the screen would ever be
//and limit the upper number. it is again limited by the columns allow (function at the top of the page)
//got rid of DOM call here to avoid forced sync issues.
//these pizzas are also placed on their own layers in the CSS.
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
	document.getElementById("movingPizzas1").appendChild(elem);
	updatePositions();
}
