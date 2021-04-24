#if defined(ESP8266)
#include <ESP8266WiFi.h>
#else
#include <WiFi.h>
#endif
#include "aWOT.h"

#define WIFI_SSID "Arduino RC Tank"
#define WIFI_PASSWORD ""
  
  
void setup() {
  Serial.begin(115200);
  
  if (WiFi.softAP(WIFI_SSID, emptyString,1, false, 10))
    Serial.println("Connection established");
  else
    Serial.println("Connection failed");  
}
  
void loop() {  
  
}