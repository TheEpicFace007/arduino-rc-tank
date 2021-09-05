#pragma once
#ifndef TANK_H
#define TANK_H

#undef PIN_WIRE_SDA
#undef PIN_WIRE_SCL
#include "Wire.h"
#include <Adafruit_PWMServoDriver.h>
#include <stdio.h>
#include <Servo.h>

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
  Direction_Forward,
  Direction_Backard,
  Direction_Left,
  Direction_Right,
  Direction_Stop
};

enum Engine {
  engine_a,
  engine_b,
  engine_c,
  engine_d
};

typedef struct {
  Direction direction;
  unsigned long ms;  
} command_t;

enum Preset {
  zigzag,
  drunk
};

void move_tank(Direction direction, int speed = 200);
void turn_tank(Direction direction, int degree = 90, int turnspeed = 200);
void drunkDrive();
void demo();
void run_test();
void execute_command(command_t *command);
void execute_command_preset(Preset preset);

#endif
