#include<SoftwareSerial.h>
SoftwareSerial gsm(2,3);
    
void setup()
{
  delay(10000);
  Serial.begin(9600);
  gsm.begin(9600);
  sendData("AT+CMGF=1",3000,1);
  delay(1000);
  sendData("AT+CMGS=\"+918828250386\"\r",3000,1); //replace x by your number
  delay(1000);
  sendData("https://www.google.com/maps/place/20%C2%B000'00.0%22N+45%C2%B000'00.0%22E/data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d20!4d45",3000,1);
  delay(100);
  gsm.println((char)26);
  delay(1000);
}
void loop()
{
  
}

String sendData(String command, const int timeout, boolean debug)
{
    String response = "";
    Serial.println(command);
    long int time = millis();
    while ((time + timeout) > millis())
    {
        while (Serial.available())
        {
            char c = Serial.read();
            response += c;
        }
    }
    if (debug)
    {
        Serial.println(response);
    }
    return response;
}
///data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d20!4d45
///data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d20!4d45
