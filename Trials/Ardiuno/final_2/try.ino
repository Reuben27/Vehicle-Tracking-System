#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <stdio.h>
#include <string.h>

SoftwareSerial gsm(2, 3); // RX, TX pins of the SIM800 chip

static const int RXPin = 4, TXPin = 3;
static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial GPS(RXPin, TXPin);

float latitude = 29.56;
float longitude = 36.97;

const String apiKey="AGSGWOJIMMP0HHQJ";
void(* resetFunc) (void) = 0; //declare reset function at address 0
bool ModuleState=false;
unsigned long timeCount;
String  showString="";


void setup() {
//  Serial.begin(9600);
  Serial.begin(9600);
  Serial.println("Hello!");
  Serial.println("There need some time to initialize!");
  delay(16000);

  gsm.begin(9600);
//  GPS.begin(GPSBaud);
//  latitude = gps.location.lat();
//  longitude = gps.location.lng();

//  ModuleState=moduleStateCheck();
//  if(ModuleState==false)//if it's off, turn on it.
//  {
//    Serial.println("GSM has not yet started working");
//  }
  
#if 1
  //GPS test
//  sendData("AT+GPS=0", 1000, 1);//1: turn on GPS  0:Turn off GPS
  
  //GSM Test
  gsm.println("AT+CCID");  //get SIM 
  delay(5000);
  gsm.println("AT+CREG?");
  delay(5000);
  gsm.println("AT+CGATT=1");
  delay(5000);
  gsm.println("AT+CGACT=1,1");
  delay(5000);
  gsm.println("AT+CGDCONT=1,\"IP\",\"airtelgprs.com\"");
  delay(5000);


  gsm.println("AT+CSQ");
  delay(5000);

  String cmdString= "AT+HTTPGET=\"http://api.thingspeak.com/update.json?api_key=" + apiKey + "&field1=" + (String)latitude +"&field2=" + (String)longitude + "\"";
  gsm.println(cmdString);
  delay(5000);

#endif
  timeCount=millis();
  Serial.println("GSM Test Begin!");
}

void loop() {

//#if 1
  if(millis()-timeCount>30000) //60000ms
  {
    
//  latitude = gps.location.lat();
//  longitude = gps.location.lng();
      
  showString = "Latitude:" + (String)latitude + "." + "\r\n" +"Longitude:"+(String)longitude + ".";
  Serial.println(showString);
 
  gsm.println("AT+CGATT=1");
  delay(5000);
  gsm.println("AT+CGACT=1,1");
  delay(5000);
  gsm.println("AT+CGDCONT=1,\"IP\",\"airtelgprs.com\"");
  delay(5000);
 
  String cmdString= "AT+HTTPGET=\"http://api.thingspeak.com/update.json?api_key=" + apiKey + "&field1=" + (String)latitude +"&field2=" + (String)longitude + "\"";
  gsm.println(cmdString);
  
  
  delay(5000);
  timeCount=millis();//refresh
  }

  
//#endif
// 
//  while (Serial.available() > 0) {
//    String cstring = Serial.readString();
//    SerialUSB.print(cstring);//SerialUSB.write(Serial1.read());
//    yield();
// 
//  }
//  while (SerialUSB.available() > 0) {
//    Serial.write(SerialUSB.read());
//    yield();
//  }
}

//bool moduleStateCheck()
//{
//    int i = 0;
//    bool state=false;
//    for (i = 0; i < 10; i++)
//    {
//        String msg = String("");
//        msg = sendData("AT", 1000, 1);
//        if (msg.indexOf("OK") >= 0)
//        {
//            SerialUSB.println("GSM Module has been turned on.");
//                state=true;
//            return state;
//        }
//        delay(500);
//    }
//    return state;
//}

//String sendData(String command, const int timeout, boolean debug)
//{
//    String response = "";
//    Serial.println(command);
//    long int time = millis();
//    while ((time + timeout) > millis())
//    {
//        while (Serial.available())
//        {
//            char c = Serial.read();
//            response += c;
//        }
//    }
//    if (debug)
//    {
//        SerialUSB.print(response);
//    }
//    return response;
//}

//################################################################################################################################
