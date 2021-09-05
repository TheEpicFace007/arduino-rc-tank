#include "tank.h"
//#include <ESP8266WiFi.h>

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  //execute_command_preset(Preset::zigzag);
   drunkDrive();
}
