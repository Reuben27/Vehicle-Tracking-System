#include <SoftwareSerial.h>

SoftwareSerial gprs(2, 3); // RX, TX pins of the SIM800 chip

String FirebaseCloudFunctionURL="https://us-central1-poiuyt123.cloudfunctions.net/write?device=Noun_of_the_Field_you_want_to_write_your_Data_to";


int8_t answer;
int onModulePin= 4;       //PWR key pin for the 800 chip
String responseString;
String Data ;             //Variable to Store sensor data into  
unsigned long beltTime;
static const int ErrorPin = 10;
static long maxResponseTime = 20000;
static const unsigned long frequency = 10000;

void setup() {

      pinMode(ErrorPin, OUTPUT);
      pinMode(onModulePin, OUTPUT);
      digitalWrite(onModulePin,HIGH);
      delay(3000);
      digitalWrite(onModulePin,LOW);
      gprs.begin(9600);
      digitalWrite(ErrorPin, LOW);

      Serial.begin(9600);
      Serial.println(F("Starting..."));
      gprs.listen();
      power_on();
      gprs.stopListening();  
      delay(3000);
     
      Serial.println(F("Setup Complete"));

}

void loop() {
/*
    
    write some code to read your data from sensors and then put in the data Variable (String)
   
   */
   Data= "DAMN";
   Transfert_data (Data); //send Data to Firebase
   delay(10000);          
    


}


//############################## functions ##################################
bool Transfert_data (String Data){

   Serial.println(F("Data used for firebase transfert :"));
     Serial.println(Data);

      
  
bailout :

    gprs.println("AT+HTTPTERM");
    

    // Selects Single-connection mode
    gprs.println("AT+CIPMUX=0");
    waitUntilResponse("OK",1);
    
    
    // Waits for status IP INITIAL
    gprs.println("AT+CIPSTATUS");
    waitUntilResponse("INITIAL",2);

    
    // Sets the APN, user name and password
    gprs.println("AT+CSTT");
    waitUntilResponse("OK",3);
    
    
    // Waits for status IP START
    gprs.println("AT+CIPSTATUS");
    waitUntilResponse("START",4);

    
    // Brings Up Wireless Connection
    gprs.println("AT+CIICR");
    waitUntilResponse("OK",5);
    delay(3000);
            
    
    // Waits for status IP gprsACT
    gprs.println("AT+CIPSTATUS");
    waitUntilResponse("GPRSACT",6);
    
    
    // Gets Local IP Address
    gprs.println("AT+CIFSR");
    waitUntilResponse(".",7);
    
    
    // Waits for status IP STATUS
    gprs.println("AT+CIPSTATUS");
    waitUntilResponse("IP STATUS",8);
    delay(5000);
    Serial.println(F("Openning TCP"));
                  
    
    gprs.println("AT+SAPBR=1,1");
    waitUntilResponse("OK",9);
      
    
    gprs.println("AT+HTTPINIT");
    waitUntilResponse("OK",10);
                    
    
    gprs.println("AT+HTTPPARA=\"CID\",1");
    waitUntilResponse("OK",11);
                            
    
    String w="AT+HTTPPARA=""URL"",";
    w+=FirebaseCloudFunctionURL;
    w+= Data;
    char* wri=  w.c_str();

                                  
    Serial.println(F("request:"));
    Serial.println(w);


    gprs.println(wri);
    waitUntilResponse("OK",12);

    
    delay(500);
    gprs.println("AT+HTTPACTION=0");
    delay(1000);
    waitUntilResponse(",200,",13);
                          
    Serial.println(F("Data was uploaded Seccessfully to Firebase"));
                          

    delay(500);
    gprs.println("AT+HTTPREAD");
    waitUntilResponse("OK",14);
                         
    delay(1500);
    gprs.println("AT+HTTPTERM");
    waitUntilResponse("OK",15);
    
    return 1 ;
}
//######################################################################################################################""

void power_on(){

    uint8_t answer=0;

    // checks if the module is started
    answer = sendATcommand2("AT", "OK", "OK", 2000);
    if (answer == 0)
    {
        // power on pulse
           digitalWrite(onModulePin,HIGH);
        delay(3000);
           digitalWrite(onModulePin,LOW);

        // waits for an answer from the module
        while(answer == 0){     // Send AT every two seconds and wait for the answer
            answer = sendATcommand2("AT", "OK", "OK", 2000);
        }
    }
  while( sendATcommand2("AT+CREG?", "+CREG: 0,1", "+CREG: 0,5", 1000)== 0 )
    {
      Serial.print(F("."));
    }
    Serial.println(F("Connected to Network (BTS) "));
}

//################################################################################################################################

void waitUntilResponse(String response, int error_num)
{
  beltTime = millis();
  responseString="";
  String totalResponse = "";
  while(responseString.indexOf(response) < 0 && millis() - beltTime < maxResponseTime)
  {
    readResponse();
    totalResponse = totalResponse + responseString;
    Serial.println(responseString);
  }

  if(totalResponse.length() <= 0)
  {
    Serial.println("No response from the module. Check wiring, SIM-card and power!");
    Serial.print("Error : ");
    Serial.println(error_num);
    digitalWrite(ErrorPin, HIGH);
    delay(30000);
    exit(0); // No way to recover
  }
  else if (responseString.indexOf(response) < 0)
  {
    Serial.println("Unexpected response from the module");
    Serial.println(totalResponse);
    digitalWrite(ErrorPin, HIGH);
    delay(30000);
    exit(0); // No way to recover
  }
}

void readResponse()
{
  responseString = "";
  while(responseString.length() <= 0 || !responseString.endsWith("\n"))
  {
    tryToRead();

    if(millis() - beltTime > maxResponseTime)
    {
      return;
    }
  }
}

void tryToRead()
{
  while(gprs.available())
  {
    char c = gprs.read();  //gets one byte from serial buffer
    responseString += c; //makes the string readString
  }
}


//################################################################################################################################
int8_t sendATcommand2(char* ATcommand, char* expected_answer1,
        char* expected_answer2, unsigned int timeout){

    uint8_t x=0,  answer=0;
    char response[100];
    unsigned long previous;

    memset(response, ' ', 100);    // Initialize the string

    delay(100);

    while( gprs.available() > 0) gprs.read();    // Clean the input buffer

    gprs.println(ATcommand);    // Send the AT command


    x = 0;
    previous = millis();

    // this loop waits for the answer
    do{
        // if there are data in the UART input buffer, reads it and checks for the asnwer
        if(gprs.available() != 0){
            response[x] = gprs.read();
            x++;
            // check if the desired answer 1  is in the response of the module
            if (strstr(response, expected_answer1) != NULL)
            {
                answer = 1;
            }
            // check if the desired answer 2 is in the response of the module
            else if (strstr(response, expected_answer2) != NULL)
            {
                answer = 2;
            }
        }
    }
    // Waits for the asnwer with time out
    while((answer == 0) && ((millis() - previous) < timeout));
    
    return answer;
}
