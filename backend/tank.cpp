#include "tank.h"

void move_tank(Direction direction, int speed)
{
  switch (direction) {
  case Direction_Forward:
    digitalWrite(EngineA_Steering, LOW);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineB_Steering, HIGH);
    analogWrite(EngineB_Speed, speed);
    digitalWrite(EngineC_Steering, HIGH);
    analogWrite(EngineC_Speed, speed);
    digitalWrite(EngineD_Steering, HIGH);
    analogWrite(EngineD_Speed, speed);
    break;
  case Direction_Backard:
    digitalWrite(EngineA_Steering, HIGH);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineB_Steering, LOW);
    analogWrite(EngineB_Speed, speed);
    digitalWrite(EngineC_Steering, LOW);
    analogWrite(EngineC_Speed, speed);
    digitalWrite(EngineD_Steering, LOW);
    analogWrite(EngineD_Speed, speed);
    break;
  case Direction_Right:
    digitalWrite(EngineA_Steering, HIGH);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineC_Steering, HIGH);
    analogWrite(EngineC_Speed, speed);
    digitalWrite(EngineD_Steering, HIGH);
    analogWrite(EngineD_Speed, speed);
    digitalWrite(EngineB_Steering, HIGH);
    analogWrite(EngineB_Speed, speed);
    break;
  case Direction_Left:
    digitalWrite(EngineD_Steering, LOW);
    analogWrite(EngineD_Speed, speed);
    digitalWrite(EngineB_Steering, HIGH);
    analogWrite(EngineB_Speed, speed);
    digitalWrite(EngineA_Steering, LOW);
    analogWrite(EngineA_Speed, speed);
    digitalWrite(EngineC_Steering, LOW);
    analogWrite(EngineC_Speed, speed);
    break;
  case Direction_Stop:
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

void turn_tank(Direction direction, int degree, int turnspeed) 
{
  switch (direction) {
  case Direction_Left:
    move_tank(Direction_Left, turnspeed);
    break;
  case Direction_Right:
    move_tank(Direction_Right, turnspeed);
    break;
  }

  delay(degree / 360 * 4000);
  move_tank(Direction_Stop);
}

void drunkDrive() {
  static unsigned long seed = 10e3;
  constexpr int min_duration  = 225;
  randomSeed(++seed);
  const Direction direction = static_cast<Direction>(random(0, 3));
  unsigned long drivingDuration = static_cast<unsigned long>(random(min_duration, 5e3));
  if (direction == Direction_Left || direction == Direction_Right)
    drivingDuration = static_cast<unsigned long>(random(min_duration, 1250));
  move_tank(direction);
  delay(drivingDuration);
}
  
void run_test()
{
  Serial.println("Drving forward");
  move_tank(Direction_Forward);
  delay(2500);
  Serial.println("Driving backward");
  move_tank(Direction_Backard);
  delay(2500);
  Serial.println("Turning left");
  move_tank(Direction_Left);
  delay(1000);
  Serial.println("Turning right");
  move_tank(Direction_Right);
  delay(1000);
}

void demo() {
}

void execute_command(command_t *command)
{
  move_tank(command->direction);
  delay(command->ms);
}

void execute_command_preset(Preset preset) {
  switch (preset) {
  case Preset::drunk:
  {
    drunkDrive();
    break;
  }
  case Preset::zigzag:
  {
    command_t commands[] = {
      { Direction_Left, 400 },
      { Direction_Forward,  },
      { Direction_Right, 400 }
    };

    for (int command_idx = 0; command_idx < sizeof(commands); command_idx++) {
      execute_command(&commands[command_idx]);
    }
    break;
  }
  }
}