import React from "react";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
// import ReactNipple from "react-nipple";
import Nipple from "nipplejs";
import "./Drive.scss";
import { syncTimeout } from "../../Utils/SyncTimeout";


export function Drive()
{
  // wait for the page to load before mounting joystick x
  setTimeout(async () =>
  {
    while (document.getElementById("joy-x") === null)
      await syncTimeout(100);
    console.log("found joy x");
    const zone = document.getElementById("joy-x");
    if (zone) {
      const joystickX = Nipple.create({
        lockX: true,
        zone: zone as HTMLElement,
        dynamicPage: true,
        fadeTime: 200,
        // mode: "dynamic"
      });
    }
  }, 0);

  setTimeout(async () =>
  {
    while (document.getElementById("joy-y") === null)
      await syncTimeout(100);

    const zone = document.getElementById("joy-y");
    if (zone) {
      const joystickX = Nipple.create({
        lockX: true,
        zone: zone as HTMLElement,
        dynamicPage: true,
        fadeTime: 200,
        // mode: "dynamic"
      });
    }
  }, 0);


  document.title = "Conduire";
  return (
    <>
      <ControllerTopBar />

      <div className="joystick-place">
        <div className="joy-x" />
        <div className="joy-y" />
      </div>
    </>
  );
}