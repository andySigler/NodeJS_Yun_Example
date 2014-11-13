//////////////
//////////////
//////////////

/*

The following NodeJS script can be run
on a Lapatop with an Arduino connected serially,
or it can be run on a Yun with Bridge disabled.

*/

//////////////
//////////////
//////////////

// our super simple HTTP server, using native NodeJS modules
var http = require('http');
var fs = require('fs');

// create the HTTP server to serve the file
var my_HTTPServer = http.createServer(function(request,response){

	// when a browser sends a request, go get the index page, and respond with it
	fs.readFile(__dirname+'/index.html',function(error,my_HTML){

		// if there's an error reading the index page, send the error instead
		if(error){
			my_HTML = JSON.stringify(error);
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(my_HTML);
		response.end();
	});
});

// every server must listen on a port
my_HTTPServer.listen(8000);

console.log('HTTP server started on port 8000');

//////////////
//////////////
//////////////

// load the websocket module
var WebSocketServer = require('ws').Server;

// have it listening along with our HTTP server
var my_WebSocketServer = new WebSocketServer({
	'server':my_HTTPServer
});

// global variable for out browser's socket connection
var browserSocket = undefined;

// event fires when the browser connects to this server
my_WebSocketServer.on('connection',function(newSocket){

	browserSocket = newSocket; // save the socket to be global

	// this event fires when a message from the browser arrives
	browserSocket.on('message',function(msg){
		if(myPort && myPort.isOpen){
			myPort.write(msg);
		}
	});

	// this event fires when the connection is closed
	browserSocket.on('close',function(){
		browserSocket = undefined; // erase the socket from the global variable
	});
});

//////////////
//////////////
//////////////

var serialport = require('serialport');
var Port = serialport.SerialPort;

//var myPortName = '/dev/ttyATH0'; // for my YUN (the same for everyone)
var myPortName = '/dev/cu.usbmodem1421'; // for my laptop (different for everyone)

var myPort = undefined;

// .list doesn't work on the Yun :(
// serialport.list(function(error,ports){
// 	for(var i=0;i<ports.length;i++){
// 		console.log(ports[i].comName);
// 	}
// });

// create the port
var myPort = new Port(myPortName,{
	'baudrate':115200, // the Arduino's baud rate
	'parser': serialport.parsers.readline('\r\n') // arduino ends messages with .println()
});

// this event fires when the serial port opens
myPort.on('open',function(){
	console.log('serial port is OPEN');
	myPort.isOpen = true; // our own little variable, to tell us the port opened
});

// this event fires when we get data from the arduino
myPort.on('data',function(data){

	// if we have a socket connection, send the message
	if(browserSocket){
		browserSocket.send(data);
	}
	// else, just print it out so we can see it
	else{
		console.log(data);
	}
});

//////////////
//////////////
//////////////