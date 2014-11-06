// our global color variables
int r = 0;
int g = 0;
int b = 0;

// use Serial1 when using laptop
// use Serial11 when using YUN

void setup() {
  Serial1.begin(115200);
  
  while(!Serial1){
  }
  
  pinMode(3,OUTPUT); // red pin
  pinMode(5,OUTPUT); // green pin
  pinMode(6,OUTPUT); // blue pin
  
  pinMode(4,OUTPUT);
  digitalWrite(4,LOW); // ground for our LED
}

void loop() {
  if(Serial1.available()){
    
    // mousedown event
    if(Serial1.read()=='1'){
      
      // make a new color, and turn the LED on
      r = random(255);
      g = random(255);
      b = random(255);
      
      analogWrite(3,r);
      analogWrite(5,g);
      analogWrite(6,b);
    }
    
    // mouseup event
    else{
      
      // send the color to the browser, then turn the LED off
      Serial1.print(r);
      Serial1.print(',');
      Serial1.print(g);
      Serial1.print(',');
      Serial1.println(b);
      
      analogWrite(3,0);
      analogWrite(5,0);
      analogWrite(6,0);
    }
  }
}
