#NodeJS and Yun

Example code for running a NodeJS on the Arduino Yun.

The example runs an HTTP server on the Yun at port 8000. The webpage it serves will send a websocket message to the server when the mouse is clicked. This will turn the RGB LED to a random color, and send that color back to webpage to be dispayed.

##Install

See [THIS TUTORIAL](http://www.andysigler.com/nodejs_yun) for how to install NodeJS on the Yun, and set the board up to be used without Arduino's Bridge libary.

###Arduino

For this example, I used an RGB led plugged into digital pins 3-6. Ground in pin 4, red is pin 3, green is pin 5, and blue is pin 6.

Upload the code rgb_arduino sketch to the board. If using the Yun, be sure to use Serial1 instead of Serial.

###NodeJS

Inside app.js, be sure serialport is using the corrent port name to connect to. These can be different depending on the computer, but the Yun always uses port "/dev/ttyATH0".

#####On a Laptop

	npm install
	node app.js

#####On the Yun

When running, place only app.js and index.html on the Yun. All other files are not needed, since node-modules are installed globally on the Yun.

Be sure have installed the following modules using the Yun's package manager:

	opkg install node-ws
	opkg install node-serialport