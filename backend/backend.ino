// #include <Adafruit_ESP8266.h>
#include <SPI.h>
#define ESP8266
#include <SD.h>
#if defined(ESP8266)
#include <ESP8266WiFi.h>
#else
#include <WiFi.h>
#endif
#include "aWOT.h"

#define WIFI_SSID "Arduino RC Tank"
#define WIFI_PASSWORD "rc-tank-password"

// Generate static.bin using awot-scripts and copy it to your SD card
// You also try it out with this file https://github.com/lasselukkari/aWOT/files/5802036/static.bin.zip
#define STATIC_FILES "/static.bin"
#define READ_BUFFER_SIZE 128
/**
 * Declare that there's no speed;
*/
#define NULL_SPEED -1

WiFiServer server(80);
Application app;
File dataFile;
byte readBuffer[READ_BUFFER_SIZE];

// Forward declaration
uint32_t calculateHash(const char * string, uint32_t value = 0x811C9DC5);
uint32_t readNumber(uint32_t address);
void fileHandler(Request &req, Response &res); 
uint32_t lookupTableIndex(const char * key, uint32_t length);
bool hasEnumFlag(int enumMember, int flag);


/**
 * All the message that the websocket can receive
*/
enum MessageType {
  /*--------------------------------------
      Non engine specific commands
  --------------------------------------*/
  /**
   * Make the two motor go forward
   */
  GoForward = 0,
  /**
   * Make the two motor go backward
   */
  GoBackward = 1 << 0,
  TurnLeft = 1 << 1,
  TurnRight = 1 << 2,
  /**
  * Go to 0 and stop all engines
  */
  SpeedZero = 1 << 3,

  /*--------------------------------------
        Engine specific commands
  --------------------------------------*/
  /**
   * Make the left engine go forward
   */
  LeftEngineForward = 1 << 4,
  /**
   * Make the left engine go backward
   */
  LeftEngineBackward = 1 << 5,

  /**
   * Make the right engine go forward
   */
  RightEngineForward = 1 << 6,
  /**
   * Make the right engine go backward
   */
  RightEngineBackward = 1 << 7,

  
  /*--------------------------------------
        Control specific commands
  --------------------------------------*/
  /**
   * Signal that a button has been held 
   * Use enum flag to know what button exactly
   */
  ButtonHeld = 1 << 8,

  LeftButtonHeld = 1 << 9,
  RightButtonHeld = 1 << 10,
  UpButtonHeld = 1 << 11,
  DownButtonHeld = 1 << 12,

  /**
   * Signal that a button has been released 
   * Use enum flag to know what button exactly
   */
  ButtonRelease = 1 << 13,

  LeftButtonRelease = 1 << 14,
  RightButtonRelease = 1 << 15,
  UpButtonRelease = 1 << 16,
  DownButtonRelease = 1 << 17,

  /*--------------------------------------
        Misc commands
  --------------------------------------*/
  Undefined = 1 << 18
};

struct RCTankSocketMessage {
  MessageType message = MessageType::Undefined;
  /**
   * Optionally request individually to power on each engine
   */
  int leftEngineRequestSpeed = NULL_SPEED, rightEngineRequestSpeed = NULL_SPEED;
  int requestedSpeed = NULL_SPEED;
};

void setup() {
  // Start the wifi  modem
  Wifi.SoftAP("Arduino Tank", "password")

  Serial.begin(9600);

  // Setup the web server
  if (!SD.begin(SS)) {
    Serial.println("SD card initialization failed.");
    while (true) {}
  }

  dataFile = SD.open(STATIC_FILES);
  if (!dataFile) {
    Serial.println("Error opening " STATIC_FILES);
    while (true) {}
  }

  WiFi.begin(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  app.use(&fileHandler);

  server.begin();

  // Setup the websockewt
  
}

void loop() {
  WiFiClient client = server.available();

  if (client.connected()) {
    app.process(&client);
    client.stop();
  }
}

void fileHandler(Request &req, Response &res)
{
  uint32_t fileCount = readNumber(0);
  uint32_t tableIndex = lookupTableIndex(req.path(), fileCount);
  uint32_t infoIndex = 4 + (fileCount * 4) + (tableIndex * 12);
  uint32_t calculatedHash = calculateHash(req.path());
  uint32_t storedHash = readNumber(infoIndex);

  if (calculatedHash != storedHash) {
    return;
  }

  uint32_t offset = readNumber(infoIndex + 4);
  uint32_t length = readNumber(infoIndex + 8);

  dataFile.seek(offset);

  res.set("Connection", "close");
  res.beginHeaders();
  while (length > 0) {
    int toRead = length > READ_BUFFER_SIZE ? READ_BUFFER_SIZE : length;
    dataFile.read(readBuffer, toRead);
    res.write(readBuffer, toRead);
    length = length - toRead;
  }
  res.end();
}

uint32_t lookupTableIndex(const char * key, uint32_t length)
{
  uint32_t hash = calculateHash(key);
  int32_t seed = readNumber(((hash % length) * 4) + 4);

  if (seed < 0) {
    return 0 - seed - 1;
  }

  return calculateHash(key, seed) % length;
};

uint32_t readNumber(uint32_t address) {
  dataFile.seek(address);
  long four = dataFile.read();
  long three = dataFile.read();
  long two = dataFile.read();
  long one = dataFile.read();

  return ((four << 0) & 0xFF) +
         ((three << 8) & 0xFFFF) +
         ((two << 16) & 0xFFFFFF) +
         ((one << 24) & 0xFFFFFFFF);
}

uint32_t calculateHash(const char * string, uint32_t value = 0x811C9DC5)
{
  size_t length = strlen(string);

  for (size_t i = 0; i < length; i += 1) {
    value += (value << 1) + (value << 4) + (value << 7) + (value << 8) + (value << 24);
    value ^= string[i];
  }

  return value & 0x7FFFFFFF;
}

bool hasEnumFlag(int enumMember, int flag)
{
  if (enumMember & flag != 0)
    return true;
  else
    return false;
}

template<typename T>
char* struct_to_char(T myStruct)
{
  char foo[sizeof(T)];

  T x = myStruct;/* populate */

  memcpy(foo, &x, sizeof x);
  return foo;
}