import cstruct from "c-struct";
import { Buffer } from "buffer"

export type NullSpeed = -1;
const RC_TANK_SCHEMA_NAME = "rc-tank-scema";

/**
 * All the message that the websocket can receive
*/
export enum MessageType {
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

export function hasEnumFlag(enumMember: number, flag: number): boolean {
  if ((enumMember & flag) != 0)
    return true;
  else
    return false;
}

export interface RCTankSocketMessage {
  message: MessageType;
  requestedSpeed: number | NullSpeed;
  rightEngineRequestSpeed: number | NullSpeed;
  leftEngineRequestSpeed: NullSpeed | number
}

export const RCTankSocketMessageStructSchema = new cstruct.Schema({
  message: cstruct.type.int32,
  requestedSpeed: cstruct.type.int32,
  leftEngineRequestSpeed: cstruct.type.int32,
  rightEngineRequestSpeed: cstruct.type.int32
});

cstruct.register(RC_TANK_SCHEMA_NAME, RCTankSocketMessageStructSchema);

export function parseSocketMessage(message: Buffer): RCTankSocketMessage {
  const result: RCTankSocketMessage = {
    message: MessageType.Undefined,
    requestedSpeed: -1,
    leftEngineRequestSpeed: -1,
    rightEngineRequestSpeed: -1
  }

  if (!cstruct.unpackSync(RC_TANK_SCHEMA_NAME, message, { endian: "b"})) 
    return (cstruct.unpackSync(RC_TANK_SCHEMA_NAME, message, { endian: "l"}) as RCTankSocketMessage)
  else
    return (cstruct.unpackSync(RC_TANK_SCHEMA_NAME, message, { endian: "b"}) as RCTankSocketMessage)
}