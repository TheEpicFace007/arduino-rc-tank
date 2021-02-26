import React from "react";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
// import ReactNipple from "react-nipple";
import Nipple from "nipplejs";


export function Drive()
{
  const joystickX = Nipple.create({
    lockX: true,
  });

  document.title = "Conduire";
  return (
    <>
      <ControllerTopBar />

      <div className="joystick-place">
        
      </div>
    </>
  )
}