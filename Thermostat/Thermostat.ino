#include <aws_iot_mqtt.h>
#include <aws_iot_version.h>
#include "aws_iot_config.h"

aws_iot_mqtt_client myClient;
char JSON_buf[50];
char float_buf[5];
float reportedTemp = 70.0;
float desiredTemp = 70.0;
int cnt = 0;
int rc = 1;
bool success_connect = false;

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

void msg_callback_delta(char* src, unsigned int len, Message_status_t flag) {
  if(flag == STATUS_NORMAL) {
    // Get Temp section in delta messages
    print_log("getDeltaKeyValue", myClient.getDeltaValueByKey(src, "Temp", JSON_buf, 50));
    desiredTemp = String(JSON_buf).toFloat();
  }
}

void setup() {
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

void loop() {
  if(success_connect) {
    // If the desired temperature is set to a higher value, start heating.
    if(desiredTemp - reportedTemp > 0.001) {reportedTemp += 0.1;}
    // If the desired temperature is set to a lower value, start cooling.
    else if(reportedTemp - desiredTemp > 0.001) {reportedTemp -= 0.1;}
    dtostrf(reportedTemp, 4, 1, float_buf);
    float_buf[4] = '\0';
    sprintf_P(JSON_buf, PSTR("{\"state\":{\"reported\":{\"Temp\":%s}}}"), float_buf);
    print_log("shadow update", myClient.shadow_update(AWS_IOT_MY_THING_NAME, JSON_buf, strlen(JSON_buf), NULL, 5));
    if(myClient.yield()) {
      Serial.println("Yield failed.");
    }
    delay(1000); // check for incoming delta per 1000 ms
  }
}
