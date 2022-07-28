//#include "tank.h"
#undef PIN_WIRE_SDA
#undef PIN_WIRE_SCL
#include "Wire.h"
#include <Adafruit_PWMServoDriver.h>
#include <stdio.h>
#include <Servo.h>
#include <IRremote.h>

//#include <ESP8266WiFi.h>

enum Pins {
  EngineD_Steering = 3,
  EngineD_Speed = 2,

  EngineC_Steering = 4,
  EngineC_Speed = 5,

  EngineB_Steering = 7,
  EngineB_Speed = 6,

  EngineA_Speed = 9,
  EngineA_Steering = 8
};

enum Direction {
  dir_forw,
  dir_back,
  dir_l,
  dir_r,
  dir_stop
};

void move_tank(Direction direction, int speed);

void turn_tank(Direction direction, int degree, int turnspeed) 
{
  switch (direction) {
  case dir_l:
    move_tank(dir_l, turnspeed);
    break;
  case dir_r:
    move_tank(dir_r, turnspeed);
    break;
  }

  delay(degree / 360 * 4000);
  move_tank(dir_stop, 0);
}

void move_tank(Direction direction, int speed=1000)
{
  switch (direction) {
  case dir_forw:
    digitalWrite(EngineA_Steering, LOW);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineB_Steering, HIGH);
    analogWrite(EngineB_Speed, speed);
    digitalWrite(EngineC_Steering, HIGH);
    analogWrite(EngineC_Speed, speed);
    digitalWrite(EngineD_Steering, HIGH);
    analogWrite(EngineD_Speed, speed);
    break;
  case dir_back:
    digitalWrite(EngineA_Steering, HIGH);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineB_Steering, LOW);
    analogWrite(EngineB_Speed, speed);
    digitalWrite(EngineC_Steering, LOW);
    analogWrite(EngineC_Speed, speed);
    digitalWrite(EngineD_Steering, LOW);
    analogWrite(EngineD_Speed, speed);
    break;
  case dir_r:
    digitalWrite(EngineA_Steering, HIGH);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineC_Steering, HIGH);
    analogWrite(EngineC_Speed, speed);
    digitalWrite(EngineD_Steering, HIGH);
    analogWrite(EngineD_Speed, speed);
    digitalWrite(EngineB_Steering, HIGH);
    analogWrite(EngineB_Speed, speed);
    break;
  case dir_l:
    digitalWrite(EngineD_Steering, LOW);
    analogWrite(EngineD_Speed, speed);
    digitalWrite(EngineB_Steering, HIGH);
    analogWrite(EngineB_Speed, speed);
    digitalWrite(EngineA_Steering, LOW);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineC_Steering, LOW);
    analogWrite(EngineC_Speed, speed);
    break;
  case dir_stop:
    digitalWrite(EngineA_Steering, LOW);
    analogWrite(EngineA_Speed, 0);
    digitalWrite(EngineB_Steering, LOW);
    analogWrite(EngineB_Speed, 0);
    digitalWrite(EngineC_Steering, HIGH);
    analogWrite(EngineC_Speed, 0);
    digitalWrite(EngineD_Steering, LOW);
    analogWrite(EngineD_Speed, 0);
    break;
  }
}

void setup()
{
  Serial.begin(9600);
  IrReceiver.begin(7, ENABLE_LED_FEEDBACK);
}

int tankSpeed = 100;
Direction action = dir_stop;

void loop()
{
  if (IrReceiver.decode()) {
    Serial.print("Decoded IR Code: ");
    auto ircode = IrReceiver.decodedIRData.decodedRawData;
    Serial.println(ircode, HEX);
    IrReceiver.resume();
    switch (ircode) {
    case 0xA01000B0: // 1
      tankSpeed = 100;
      break;
    case 0xA11100B0: // 2
      tankSpeed = 200;
      break;
    case 0xA21200B0: // 3
      tankSpeed = 300;
      break;
    case 0xA31300B0: // 4
      tankSpeed = 400;
      break;
    case 0xA41400B0: // 5
      tankSpeed = 500;
      break;
    case 0xA51500B0: // 6
      tankSpeed = 600;
      break;
    case 0xA61600B0: // 7
      tankSpeed = 700;
      break;
    case 0xA71700B0: // 8
      tankSpeed = 800;
      break;
    case 0xA81800B0: // 9
      tankSpeed = 900;
      break;
    case 0x358500B0:
      action = dir_forw;
      break;
    case 0x368600B0:
      action = dir_back;
      break;
    case 0x378700B0:
      action = dir_r;
      break;
    case 0x388800B0:
      action = dir_l;
      break;
    case 0x328200B0:
      action = dir_stop;
      break;
    }
  }
  move_tank(action, tankSpeed);
}
