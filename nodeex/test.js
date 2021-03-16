const {Board, Stepper, Pin, LCD} = require("johnny-five");
var keypress = require('keypress');


keypress(process.stdin);

var board = new Board();

board.on("ready", () => {
  //silnik krokowy
  var stepper = new Stepper({
    type: Stepper.TYPE.DRIVER,
    stepsPerRev: 200,
    pins: {
      step: 12,
      dir: 13
    }
  });
  //podczerwien
 // var ir = new ir(7);
  //fototranzystory
  var pt0 = new Pin({ //8,9,10,11
    pin: 8, 
  });
  var pt1 = new Pin({ //8,9,10,11
    pin: 9, 
  });
  var pt2 = new Pin({ //8,9,10,11
    pin: 10, 
  });
  var pt3 = new Pin({ //8,9,10,11
    pin: 11, 
  });
  //LCD
  var a = new LCD({
    controller: "PCF8574A",
  });

  var t = new LCD({
    controller: "PCF8574T",
  });
///////////////////////////////////

/*Kontrolka Uruchomieniowa – sprowadzenie windy na parter(poziom startowy)*/
var pietro =30;
if (pt0.low() && pt3.low()) {
  stepper.direction(1).step(2000)
  while(pt0.low()){
    //stepper.enable();
    Stepper.RUNSTATE.RUN
    }
}
if(pt0.high() && pietro != 0){
  stepper.step(2000);
  lcd.cursor(0, 0).print("Pietro: 0");
  lcd.cursor(1, 0).print("Gotowy");
  console.log("start zmiana na 0\n");
  pietro = 0;
  } 
// sterwoanie
  process.stdin.resume(); 
  process.stdin.setEncoding('utf8'); 
  process.stdin.setRawMode(true); 

  process.stdin.on('keypress', function (ch, key) {

      if ( !key ) return;

     if ( key.name == 'up' ) {

          console.log('W gore');
          stepper.direction(0).step(2000)

      } else if ( key.name == 'down' ) {

          console.log('W dol');
          stepper.direction(1).step(2000)     

      } else if ( key.name == 'space' ) {

          console.log('Zatrzymanie');
          stepper.stop();
      }});

/*---Zgłaszanie pięter---*/
   /*Parter*/
   if(pt0.high() && pietro != 0)
   {
     console.log(" zmiana na 0\n");
     pietro = 0;
     lcd.cursor(0, 0).print("Pietro: 0");    
   }
  /*Pierwsze piętro*/
  if(pt1.high() && pietro != 1)
  {
    
    console.log("zmiana na 1\n");
    pietro = 1;
    lcd.cursor(0, 0).print("Pietro: I");  
    
  }
  /*Drugie piętro*/
  if(pt2.high() == HIGH && pietro != 2)
  {
    console.log("start zmiana na 2\n");
    pietro = 2;
    lcd.cursor(0, 0).print("Pietro: II");  
    
  }
  /*Trzecie piętro*/
  if(pt3.high() == HIGH && pietro != 3)
  {
    console.log(" zmiana na 3\n");
    pietro = 3;
    lcd.cursor(0, 0).print("Pietro: III");  
  }

});
