#NodeJS and Yun

Example code for running a NodeJS on the Arduino Yun. See [andysigler.com/nodejs_yun](http://www.andysigler.com/nodejs_yun) for how to install NodeJS on the Yun, and set the board up to be used with Bridge.

For this example, I used an RGB led plugged into digital pins 3-6. Ground in pin 4.

Once running and an LED is connected, point a browser to you're Yun's IP address at port 8000. Clicking the screen will cause the LED to change color, and then to set the screen's background color.

##Install

###NodeJS

Inside app.js, be sure serialport is using the corrent port name to connect to. These can be different depending on the computer, but the Yun always uses port "/dev/ttyATH0".

#####Laptop

npm install
node app.js

#####Yun

When running, place only app.js and index.html on the Yun. All other files are not needed, since node-modules are installed globally on the Yun.

Be sure have installed the following modules using the Yun's package manager:

opkg install node-ws
opkg install node-serialport