// our global color variables
int r = 0;
int g = 0;
int b = 0;

// use Serial when using laptop
// use Serial1 when using YUN

void setup() {
  
  Serial.begin(115200);
  
  while(!Serial){
  }
  
  pinMode(3,OUTPUT); // red pin
  pinMode(5,OUTPUT); // green pin
  pinMode(6,OUTPUT); // blue pin
  
  pinMode(4,OUTPUT);
  digitalWrite(4,LOW); // ground for our LED
}

void loop() {
  if(Serial.available()){
    
    // mousedown event
    if(Serial.read()=='1'){
      
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
      Serial.print(r);
      Serial.print(',');
      Serial.print(g);
      Serial.print(',');
      Serial.println(b);
      
      analogWrite(3,0);
      analogWrite(5,0);
      analogWrite(6,0);
    }
  }
}
