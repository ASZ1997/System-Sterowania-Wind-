/*Biblioteki*/
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <IRremote.h>

/*konfiguracja nadajnika podczerwieni*/
const int RECV_PIN = 7; 
IRrecv irrecv(RECV_PIN);
decode_results results;

/*konfiguracja LCD*/
LiquidCrystal_I2C lcd(0x27,16,2);
String Pierwsza = "";
String Druga = "";

/*Aktualne/Ostatnie pietro*/
int pietro = 30;

/*Adresy na pilocie
HEX minus = 0xFFE01F;
HEX plus = 0xFFA857;
HEX zero = 0xF9EC0295;
HEX jeden = 0xFF30CF;
HEX dwa = 0xFF18E7;
HEX trzy = 0xFF7A85; 
*/

/*Predkosc poczatkowa silnika krokowego*/
int pend = 20;

/*Kod wykonywany przy  uruchomieniu*/
void setup() 
{
/*inicjacja LCD*/
  lcd.init();
  lcd.backlight();

  
/*Konfiguracja pinów*/
  Serial.begin(9600);
  pinMode(13,OUTPUT); // kierunek
  pinMode(12,OUTPUT); // takt
  pinMode(8,INPUT); // parter
  pinMode(9,INPUT); // 1-piętro
  pinMode(10,INPUT); // 2-piętro
  pinMode(11,INPUT); // 3-piętro

/*inicjacja komunijna podczerwieni*/  
irrecv.enableIRIn();

  
/*Kontrolka Uruchomieniowa – sprowadzenie windy na parter(poziom startowy)*/
  if (getP0() == LOW && getP3() == LOW) {
    down();
    while(getP0() == LOW){
      start();
      }
  }
  if(getP0() == HIGH && pietro != 0){
    strp();
    wyswietlP("Pietro: 0");
    wyswietlD("Gotowy");
    Serial.print("start zmiana na 0\n");
    pietro = 0;
    }
}

/*Obsługa w pętli*/
void loop() 
{  
  /*---Obsługa pilota---*/
  if(irrecv.decode(&results)){
    strp();
    switch(results.value){

      /*(Zero) – Idź do parteru*/
      case 0xFF6897:
        strp();
        wyswietlD("... -> 0");
        if(pietro > 0){
          down();
          }
        while(getP0()== LOW && pietro != 0){
          control();
          start();
        }
        if(pietro == 0){
          control();
          wyswietlD("");
          }
      break;

      /*(Jeden) – Idź na pierwsze piętro */
      case 0xFF30CF:
        strp();
        wyswietlD("... -> 1");
        if(pietro > 1){
          down();
          }
        if(pietro < 1){
          up();
          }
        while(pietro != 1){
          control();
          start();
        }
        if(pietro == 1){
          control();
          wyswietlD("");
          }
      break;

      /*(Dwa) – Idź na drugie piętro*/
      case 0xFF18E7:
        strp();
        wyswietlD("... -> 2");
        if(pietro > 2){
          down();
          }
        if(pietro < 2){
          up();
          }
        while( pietro != 2){
          control();
          start();
        }
        if(pietro == 2){
          control();
          wyswietlD("");
          }
      break;

      /*(Trzy) ) – Idź na trzecie piętro */
      case 0xFF7A85:
        strp();
        wyswietlD("... -> 3");
        if(pietro < 3){
          up();
          }
        while( pietro != 3){
          control();
          start();
        }
        if(pietro == 3){
          control();
          wyswietlD("");
          down();
          }
      break;

      /*(Minus) )– zmniejsz prędkość */
      case 0xFFE01F:
        if(pend == 50 || pend == 20){
          predkosc();
          }
        if(pend < 50){
        pend = pend + 10;
        predkosc();
        }
      break;

      /*(Plus) – zwiększ prędkość*/
      case 0xFFA857:
      if(pend == 50 || pend == 20){
        predkosc();
        }
      if(pend > 20){
        pend = pend - 10;
        predkosc();
      }
      break;
    }
    irrecv.resume();
   }  
}
/*Funkcje programowe*/
/*---Obsługa wyświetlacza---*/
/*Wyświetlanie w pierwszym wierszu*/
void wyswietlP(String a){
  lcd.clear();
  lcd.setCursor(0,1);
  lcd.print(Druga);
  
  lcd.setCursor(0,0);
  lcd.print(a);
  Pierwsza = a;
  Serial.print(a + "\n");
}
/* Wyświetlanie w drugim wierszu*/
void wyswietlD(String a){
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(Pierwsza);
  
  lcd.setCursor(0,1);
  lcd.print(a);
  Druga = a;
  Serial.print(a + "\n");
}
/*Wyświetl w obu wierszach*/
void wyswietl(String a, String b){
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(a);
  lcd.setCursor(0,1);
  lcd.print(b);
  Pierwsza = "";
  Druga = "";
  //Serial.print(a +" "+ b + "\n");
  return;
}

/*---Odpowiedzi czujników---*/
/*Parter*/
boolean getP0(){
  return digitalRead(8);
}
/*1 Piętro*/
boolean getP1(){
  return digitalRead(9);
}
/*2 Piętro*/
boolean getP2(){
  return digitalRead(10);
}
/*3 Piętro*/
boolean getP3(){
  return digitalRead(11);
}

/*---Prędkosc windy---*/
void start(){
  digitalWrite(12,LOW);
  delay(pend);
  digitalWrite(12,HIGH);
  delay(pend);
}

/*---Kierunki Windy---*/
/*Do góry*/
void up(){
  digitalWrite(13,HIGH);
}
/*Na dół*/
void down(){
  digitalWrite(13,LOW);
}

  /*---Zgłaszanie pięter---*/
void control(){
  /*Parter*/
  if(getP0() == HIGH && pietro != 0)
  {
    Serial.print(" zmiana na 0\n");
    pietro = 0;
    wyswietlP("Pietro: 00");    
  }
  /*Pierwsze piętro*/
  if(getP1() == HIGH && pietro != 1)
  {
    
    Serial.print("zmiana na 1\n");
    pietro = 1;
    wyswietlP("Pietro: I");
    
  }
  /*Drugie piętro*/
  if(getP2() == HIGH && pietro != 2)
  {
    Serial.print("start zmiana na 2\n");
    pietro = 2;
    wyswietlP("Pietro: II");
    
  }
  /*Trzecie piętro*/
  if(getP3() == HIGH && pietro != 3)
  {
    Serial.print(" zmiana na 3\n");
    pietro = 3;
    wyswietlP("Pietro: III");
  }
}

/*Wyświetlanie piętra na konsoli*/
void strp(){
  switch(pietro){
    case 0:
    Serial.print( "0\n");
    break;

    case 1:
    Serial.print("1\n");
    break;

    case 2:
    Serial.print("2\n");
    break;

    case 3:
    Serial.print("3\n");
    break;

    default:
    Serial.print("inna\n");
    break;
    }
}

/*Funkcja wyświetlania prędkości*/
 void predkosc(){
  switch(pend){
    case 20:
    wyswietlD("Predkosc 4");
    break;

    case 30:
    wyswietlD("Predkosc 3");
    break;

    case 40:
    wyswietlD("Predkosc 2");
    break;

    case 50:
    wyswietlD("Predkosc 1");
    break;
    }
  }
