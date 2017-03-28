
#include <aws_iot_mqtt.h>
#include <aws_iot_version.h>
#include "aws_iot_config.h"





aws_iot_mqtt_client myClient;
char JSON_buf[100];
int cnt = 0;
int rc = 1;
bool success_connect = false;


float readTemp(){
int sensorPin = 0;   
 //getting the voltage reading from the temperature sensor
 int reading = analogRead(sensorPin);  
 
 // converting that reading to voltage, for 3.3v arduino use 3.3
 float voltage = reading * 5.0;
 voltage /= 1024.0; 
 
 // print out the voltage
 
 // now print out the temperature
 float temperatureC = (voltage - 0.5) * 100 ;  //converting from 10 mv per degree wit 500 mV offset
                                               //to degrees ((voltage - 500mV) times 100)
 
 // now convert to Fahrenheit
// float temperatureF = (temperatureC * 9.0 / 5.0) + 32.0;
 //Serial.print(temperatureF); Serial.println(" degrees F");

 return temperatureC;
 
}

bool print_log(const char* src, int code) {
  bool ret = true;
  if(code == 0) {
    #ifdef AWS_IOT_DEBUG
      Serial.print(F("[LOG] command: "));
      Serial.print(src);
      Serial.println(F(" completed."));
    #endif
    ret = true;
  }
  else {
    #ifdef AWS_IOT_DEBUG
      Serial.print(F("[ERR] command: "));
      Serial.print(src);
      Serial.print(F(" code: "));
     Serial.println(code);
    #endif
    ret = false;
  }
  Serial.flush();
  return ret;
}

void reportTemp(){

    String payload = "{\"state\":{\"reported\":";
    payload += "{\"current\":";
    payload += String(readTemp());
    payload += "}}}";
    payload.toCharArray(JSON_buf, 100);

  print_log("reporting temperature", myClient.shadow_update(AWS_IOT_MY_THING_NAME, JSON_buf, strlen(JSON_buf), NULL, 5));
}

void msg_callback_delta(char* src, unsigned int len, Message_status_t flag) {
  IoT_Error_t min_err;
  IoT_Error_t max_err;

  
  if(flag == STATUS_NORMAL) {
    min_err = myClient.getDeltaValueByKey(src, "min", JSON_buf, 100);
    float min_temp = String(JSON_buf).toFloat();
    max_err = myClient.getDeltaValueByKey(src, "max", JSON_buf, 100);
    float max_temp = String(JSON_buf).toFloat();

    if ( (min_err > 0 || max_err > 0) &&  (min_temp != 0 || max_temp != 0) ) {
      print_log("getDeltaKeyValueByKey",min_err);
      print_log("getDeltaKeyValueByKey",max_err);

    }
  }
}

 
void setup()
{
  Serial.begin(115200);
  while(!Serial);

  char curr_version[80];
  snprintf_P(curr_version, 80, PSTR("AWS IoT SDK Version(dev) %d.%d.%d-%s\n"), VERSION_MAJOR, VERSION_MINOR, VERSION_PATCH, VERSION_TAG);
  Serial.println(curr_version);

  if(print_log("setup", myClient.setup(AWS_IOT_CLIENT_ID))) {
    if(print_log("config", myClient.config(AWS_IOT_MQTT_HOST, AWS_IOT_MQTT_PORT, AWS_IOT_ROOT_CA_PATH, AWS_IOT_PRIVATE_KEY_PATH, AWS_IOT_CERTIFICATE_PATH))) {
      if(print_log("connect", myClient.connect())) {
        success_connect = true;
        print_log("shadow init", myClient.shadow_init(AWS_IOT_MY_THING_NAME));
        print_log("register thing shadow delta function", myClient.shadow_register_delta_func(AWS_IOT_MY_THING_NAME, msg_callback_delta));
      }
    }
  }                 
}
 
void loop()                     // run over and over again
{
  if(success_connect) {
    if(myClient.yield()) {
      Serial.println(F("Yield failed."));

    }
    reportTemp();

    delay(10000); // check for incoming delta per 100 ms
  }
}


