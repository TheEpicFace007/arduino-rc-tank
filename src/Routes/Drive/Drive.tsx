import React, { useRef } from "react";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
// import ReactNipple from "react-nipple";
import Nipple from "nipplejs";
import "./Drive.scss";
import { syncTimeout } from "../../Utils/SyncTimeout";
import { Joystick, JoystickMovedEventArgs } from "../../Components/Control/Joystick";
import NippleJs from "nipplejs";


export function Drive()
{
  // wait for the page to load before mounting joystick x
  document.title = "Conduire";

  const joyX = React.useRef<HTMLDivElement>(null);
  if (joyX.current) {
    const joyXInstance = NippleJs.create({
      // catchDistance: true,
      dynamicPage: true,
      lockX: true,
      zone: joyX.current
    });
    console.log("pog");
  }
  const joyY = React.useRef<HTMLDivElement>(null);
  if (joyY.current) {
    const joyYInstance = NippleJs.create({
      // catchDistance: true,
      dynamicPage: true,
      lockY: true,
      zone: joyY.current
    });
    console.log("pog");
  }

  return (
    <>
      <header>
        <ControllerTopBar />
      </header>

      <main>
        <div ref={joyX} />
        <div ref={joyY} />
      </main>
    </>
  );
}