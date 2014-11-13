//////////////
//////////////
//////////////

// our super simple HTTP server, using native NodeJS modules
var http = require('http');
var fs = require('fs');

// create the HTTP server to serve the file
var my_HTTPServer = http.createServer(function(request,response){
	fs.readFile(__dirname+'/index.html',function(error,my_HTML){
		if(error){
			my_HTML = JSON.stringify(error);
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(my_HTML);
		response.end();
	});
});
my_HTTPServer.listen(8000);

console.log('HTTP server started on port 8000');

//////////////
//////////////
//////////////

var WebSocketServer = require('ws').Server;

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
		myPort.write(msg);
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

var portName_yun = '/dev/ttyATH0'; // for my YUN (the same for everyone)
var portName_laptop = '/dev/tty.usbmodem1411'; // for my laptop (different for everyone)

var myPort = new Port(portName_yun,{
	'baudrate':115200,
	'parser': serialport.parsers.readline('\r\n') // arduino ends messages with .println()
});

// this event fires when the serial port opens
myPort.on('open',function(){
	console.log('serial port is OPEN');
});

// this event fires when we get data from the arduino
myPort.on('data',function(data){
	if(browserSocket){
		browserSocket.send(data);
	}
	else{
		console.log(data);
	}
});

//////////////
//////////////
//////////////