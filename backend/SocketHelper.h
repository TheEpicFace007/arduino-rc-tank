#ifndef SOCKET_HELPER_H
#define SOCKET_HELPER_H

#define NULL_SPEED -1
/**
* All the message that the websocket can receive
*/
enum MessageType {
  /*--------------------------------------
      Non engine specific commands
    --------------------------------------*/
  /**
     Make the two motor go forward
  */
  GoForward = 0,
  /**
     Make the two motor go backward
  */
  GoBackward = 1 << 0,
  TurnLeft = 1 << 1,
  TurnRight = 1 << 2,
  /**
    Go to 0 and stop all engines
  */
  SpeedZero = 1 << 3,

  /*--------------------------------------
        Engine specific commands
    --------------------------------------*/
  /**
     Make the left engine go forward
  */
  LeftEngineForward = 1 << 4,
  /**
     Make the left engine go backward
  */
  LeftEngineBackward = 1 << 5,

  /**
     Make the right engine go forward
  */
  RightEngineForward = 1 << 6,
  /**
     Make the right engine go backward
  */
  RightEngineBackward = 1 << 7,


  /*--------------------------------------
        Control specific commands
    --------------------------------------*/
  /**
     Signal that a button has been held
     Use enum flag to know what button exactly
  */
  ButtonHeld = 1 << 8,

  LeftButtonHeld = 1 << 9,
  RightButtonHeld = 1 << 10,
  UpButtonHeld = 1 << 11,
  DownButtonHeld = 1 << 12,

  /**
     Signal that a button has been released
     Use enum flag to know what button exactly
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
     Optionally request individually to power on each engine
  */
  int leftEngineRequestSpeed = NULL_SPEED, rightEngineRequestSpeed = NULL_SPEED;
  int requestedSpeed = NULL_SPEED;
};

#endif