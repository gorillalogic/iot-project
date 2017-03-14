#ifndef config_usr_h
#define config_usr_h

// Copy and paste your configuration into this file
//===============================================================
#define AWS_IOT_MQTT_HOST "a2v5gw2hwl6hzj.iot.us-west-2.amazonaws.com"   // your endpoint
#define AWS_IOT_MQTT_PORT 8883                  // your port
#define AWS_IOT_CLIENT_ID "AnotherID23423"           // your client ID
#define AWS_IOT_MY_THING_NAME "Fan1"            // your thing name
#define AWS_IOT_ROOT_CA_FILENAME "aws-iot-rootCA.crt"           // your root-CA filename
#define AWS_IOT_CERTIFICATE_FILENAME "3f5f9399cc-certificate.pem.crt"                 // your certificate filename
#define AWS_IOT_PRIVATE_KEY_FILENAME "3f5f9399cc-private.pem.key"                // your private key filename
#define AWS_IOT_DEBUG										// Enable debug logging. Remove it if you want to disable it.
//===============================================================
// SDK config, DO NOT modify it
#define AWS_IOT_PATH_PREFIX "../certs/"
#define AWS_IOT_ROOT_CA_PATH AWS_IOT_PATH_PREFIX AWS_IOT_ROOT_CA_FILENAME			// use this in config call
#define AWS_IOT_CERTIFICATE_PATH AWS_IOT_PATH_PREFIX AWS_IOT_CERTIFICATE_FILENAME	// use this in config call
#define AWS_IOT_PRIVATE_KEY_PATH AWS_IOT_PATH_PREFIX AWS_IOT_PRIVATE_KEY_FILENAME	// use this in config call

#endif
