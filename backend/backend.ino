#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

void printWifiInfo(WiFiClass *wifi);

void setup()
{
  Serial.begin(9600);
  WiFi.begin("BELL650", "DFEA66F4");
  Serial.println("Compiled with wifi libraries");
}

void loop()
{
  printWifiInfo(&WiFi);
  delay(500);
}

void printWifiInfo(WiFiClass *wifi)
{
  const char* wifiStatus;
  switch (wifi->status()) {
  case WL_CONNECTED:
    wifiStatus = "WL_CONNECTED";
    break;
  case WL_NO_SHIELD:
    wifiStatus = "WL_NO_SHIELD";
    break;
  case WL_IDLE_STATUS:
    wifiStatus = "WL_IDLE_STATUS";
    break;
  case WL_NO_SSID_AVAIL:
    wifiStatus = "WL_NO_SSID_AVAIL";
    break;
  case WL_SCAN_COMPLETED:
    wifiStatus = "WL_SCAN_COMPLETED";
    break;
  case WL_CONNECT_FAILED:
    wifiStatus = "WL_CONNECT_FAILED";
    break;
  case WL_CONNECTION_LOST:
    wifiStatus = "WL_CONNECTION_LOST";
    break;
  case WL_DISCONNECTED:
    wifiStatus = "WL_DISCONNECTED";
    break;
  }
  Serial.println("Wifi.status():");
  Serial.println(wifiStatus);
}
