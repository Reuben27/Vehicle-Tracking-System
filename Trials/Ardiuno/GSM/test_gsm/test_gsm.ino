#include<SoftwareSerial.h>
/*
  Pin2 -> SIM-module-TX
  Pin3 -> SIM-module-RX
*/

/* 
 * Here Port 2 is the acting as reciever on Ardiuno.
 * Here Port 3 is the acting as transmitter on Ardiuno.
 */

SoftwareSerial gsm(2,3);
void setup()
{
  Serial.begin(9600);
  gsm.begin(9600);
}
void loop()
{
  if(gsm.available())
  {
    Serial.write(gsm.read());
  }
  if(Serial.available())
  {
    byte a=Serial.read();
    if(a=='#')
    {
      gsm.write( 0x1a );
    }
    else
    {
      gsm.write(a);
    }
  }
} 



//AT+GPS=0
//AT+CCID
//AT+CREG?
//AT+CGATT=1
//AT+CGACT=1,1
//AT+CGDCONT=1,"IP","airtelgprs.com"
//AT+CSQ
//AT+HTTPGET="http://api.thingspeak.com/update.json?api_key=AGSGWOJIMMP0HHQJ&field1=29.56&field2=36.97"
