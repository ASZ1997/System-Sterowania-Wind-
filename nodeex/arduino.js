var five = require("johnny-five");
var board = new five.Board();

// Create an emitter object to receive commands from the server	  
var events = require('events');	  
var emitter = new events.EventEmitter();
board.on("ready", () => {

    var servo = five.servo(8)
    var ir = five.ir(11)
});

servo.on("data", ()=>
{
    console.log()
});
////////////////////////////////////////////////////////////////////
  /*---Obsługa pilota---*/

//   if(irrecv.decode(&results)){
//     strp();
//     switch(results.value){

//       /*(Zero) – Idź do parteru*/
//       case 0xFF6897:
//         strp();
//         wyswietlD("... -> 0");
//         if(pietro > 0){
//           down();
//           }
//         while(getP0()== LOW && pietro != 0){
//           control();
//           start();
//         }
//         if(pietro == 0){
//           control();
//           wyswietlD("");
//           }
//       break;

//       /*(Jeden) – Idź na pierwsze piętro */
//       case 0xFF30CF:
//         strp();
//         wyswietlD("... -> 1");
//         if(pietro > 1){
//           down();
//           }
//         if(pietro < 1){
//           up();
//           }
//         while(pietro != 1){
//           control();
//           start();
//         }
//         if(pietro == 1){
//           control();
//           wyswietlD("");
//           }
//       break;

//       /*(Dwa) – Idź na drugie piętro*/
//       case 0xFF18E7:
//         strp();
//         wyswietlD("... -> 2");
//         if(pietro > 2){
//           down();
//           }
//         if(pietro < 2){
//           up();
//           }
//         while( pietro != 2){
//           control();
//           start();
//         }
//         if(pietro == 2){
//           control();
//           wyswietlD("");
//           }
//       break;

//       /*(Trzy) ) – Idź na trzecie piętro */
//       case 0xFF7A85:
//         strp();
//         wyswietlD("... -> 3");
//         if(pietro < 3){
//           up();
//           }
//         while( pietro != 3){
//           control();
//           start();
//         }
//         if(pietro == 3){
//           control();
//           wyswietlD("");
//           down();
//           }
//       break;

//       /*(Minus) )– zmniejsz prędkość */
//       case 0xFFE01F:
//         if(pend == 50 || pend == 20){
//           predkosc();
//           }
//         if(pend < 50){
//         pend = pend + 10;
//         predkosc();
//         }
//       break;

//       /*(Plus) – zwiększ prędkość*/
//       case 0xFFA857:
//       if(pend == 50 || pend == 20){
//         predkosc();
//         }
//       if(pend > 20){
//         pend = pend - 10;
//         predkosc();
//       }
//       break;
//     }
//     irrecv.resume();
//    }  
// }
// /*Funkcje programowe*/
// /*---Obsługa wyświetlacza---*/
// /*Wyświetlanie w pierwszym wierszu*/
// void wyswietlP(String a){
//   lcd.clear();
//   lcd.setCursor(0,1);
//   lcd.print(Druga);
  
//   lcd.setCursor(0,0);
//   lcd.print(a);
//   Pierwsza = a;
//   Serial.print(a + "\n");
// }
// /* Wyświetlanie w drugim wierszu*/
// void wyswietlD(String a){
//   lcd.clear();
//   lcd.setCursor(0,0);
//   lcd.print(Pierwsza);
  
//   lcd.setCursor(0,1);
//   lcd.print(a);
//   Druga = a;
//   Serial.print(a + "\n");
// }
// /*Wyświetl w obu wierszach*/
// void wyswietl(String a, String b){
//   lcd.clear();
//   lcd.setCursor(0,0);
//   lcd.print(a);
//   lcd.setCursor(0,1);
//   lcd.print(b);
//   Pierwsza = "";
//   Druga = "";
//   //Serial.print(a +" "+ b + "\n");
//   return;
// }

// /*---Odpowiedzi czujników---*/
// /*Parter*/
// boolean getP0(){
//   return digitalRead(8);
// }
// /*1 Piętro*/
// boolean getP1(){
//   return digitalRead(9);
// }
// /*2 Piętro*/
// boolean getP2(){
//   return digitalRead(10);
// }
// /*3 Piętro*/
// boolean getP3(){
//   return digitalRead(11);
// }

// /*---Prędkosc windy---*/
// void start(){
//   digitalWrite(12,LOW);
//   delay(pend);
//   digitalWrite(12,HIGH);
//   delay(pend);
// }

// /*---Kierunki Windy---*/
// /*Do góry*/
// void up(){
//   digitalWrite(13,HIGH);
// }
// /*Na dół*/
// void down(){
//   digitalWrite(13,LOW);
// }

// /*Wyświetlanie piętra na konsoli*/
// void strp(){
//   switch(pietro){
//     case 0:
//     Serial.print( "0\n");
//     break;

//     case 1:
//     Serial.print("1\n");
//     break;

//     case 2:
//     Serial.print("2\n");
//     break;

//     case 3:
//     Serial.print("3\n");
//     break;

//     default:
//     Serial.print("inna\n");
//     break;
//     }
// }

// /*Funkcja wyświetlania prędkości*/
//  void predkosc(){
//   switch(pend){
//     case 20:
//     wyswietlD("Predkosc 4");
//     break;

//     case 30:
//     wyswietlD("Predkosc 3");
//     break;

//     case 40:
//     wyswietlD("Predkosc 2");
//     break;

//     case 50:
//     wyswietlD("Predkosc 1");
//     break;
//     }
//   }

 /* 
 board.on("ready", function() {
  var a = new five.LCD({
    controller: "PCF8574A",
  });

  var t = new five.LCD({
    controller: "PCF8574T",
  });

  [a, t].forEach(lcd => {
    lcd.cursor(0, 0).print("10".repeat(8));
    lcd.cursor(1, 0).print("01".repeat(8));
    lcd.noBacklight();
  });


  if (x > 0) {
    // do something
} else {
    // do something else
}
for (var i = 0; i < myArray.length; i++) {
  console.log(myArray[i]);
}

while (x < 10) {
  console.log(x++);
}

myMotor.on("start", function( err, timestamp ) {
  console.log( "started", timestamp );

  // stop after 2 seconds
  board.wait(2000, function() {
    myMotor.stop();
  });
}); 
myMotor.on("stop", function( err, timestamp ) {
  console.log( "stopped", timestamp );
});
myMotor.start();


myPhotoresistor.on("read", function( err, value ) {
  // range of led brightness is 0 - 255
  var brightnessValue = five.Fn.constrain(five.Fn.map(value, 0, 900, 0, 255), 0, 255);
  myLed.brightness(brightnessValue);
});

myPhotoresistor.on("data", function( err, value ) {
  var threshold = 300;
  if (value > threshold) {
    myLed.on();
  } else {
    myLed.off();
  }

  myPhotoresistor.booleanAt(512).on("data", function( err, value ) {
    if (this.boolean) {
        myLed.on();
    } else {
        myLed.off();
    }
});



sensor.on("data", function(){
  console.log("A val:" + this.value);
});

});*/