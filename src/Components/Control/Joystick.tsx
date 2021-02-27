import { useRef } from "react";
import { createTextSpanFromBounds } from "typescript";

export enum Direction
{
  Up,
  Down,
  Left,
  Right
}

export interface JoystickMovedEventArgs
{
  direction: Direction,
}
export interface JostickProps
{
  onMove: (e: JoystickMovedEventArgs) => void;
  height: number;
  width: number;
}

export function Joystick(props: JostickProps)
{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  if (canvasRef.current ) {
    const canvasCtx = canvasRef.current.getContext("2d");
    // @ts-ignore
    canvasCtx.arc(256, 256, 50, 0, 2 * Math.PI); canvasCtx.stroke();
    
    
  }

  return (
      <>
      <canvas ref={canvasRef}>
      </canvas>
      </>
  )
}