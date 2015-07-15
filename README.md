## Website Performance Optimization portfolio project
This assignment was to adjust a boobytrapped site to get the Page Speed Insights score to 90+ and the animations to run at 60fps.

### To Run This File:
1. Locally: 
Download this Git respository to your hard drive. 
Open a web browser like Google Chrome, and click File > Open File. 
Navigate to the index.html and open it in Chrome. 

2. Through a Server: 
  -Download this Git respository to your hard drive. 
  -Navigate to it in your terminal
  -In the terminal type: python -m SimpleHTTPServer 8080
  -Open a new tab in your terminal and navigate to the Git respository again
  -type: ngrok http 8080
  -Open a web browser like Google Chrome, and click File > Open File. 
  -Navigate to the index.html and open it in Chrome. 


## Adjustments to accomplish 90+ PSI score

### index.html
The main offenders were the images, specifically the pizza image. I compressed the images, minified the text files and because I had extra room in my html file, I preloaded the images for the Pizzeria so if the user starts at the Portfolio page, they get a head start on the Pizzeria.

### Pizzeria
I cleaned up the CSS, there was a lot of unneeded code, and embeded it in the html. I broke up the javaScript into two files. I inlined the above-the-fold information and asynced the rest. I found a few forced syncronized layout issues and refactored the code. In one example I used requestAnimationFrame and in another, I just moved the offending code out of the loop. I used CSS Triggers to refactor the code to use transform/translate instead of offsetWidth. I resized the hero image to so it would top out at 900px wide and added a CSS media query to call a smaller version instead of just scaling it. Finally, I cached some of the resources through html5 with manifest="offline.appcache".
