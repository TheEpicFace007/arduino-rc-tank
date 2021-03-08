import React, { useState, useEffect } from "react";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
// import ReactNipple from "react-nipple";
import "./Drive.scss";
import { getScreenOrientation } from "../../Utils/getOrientation";


export function Drive()
{
  // wait for the page to load before mounting joystick x
  document.title = "Conduire";
  const [portraitModeError, setPortraitModeError] = useState(getScreenOrientation() == "landscape" ? false : true);
  const [errorDivClass, setErrorDivClass] = useState("portrait-mode-error");
  const [controlClass, setControlClass] = useState<string>("");

  window.onorientationchange = function()
  {
    const newState = getScreenOrientation() == "landscape" ? false : true;
    setPortraitModeError(newState);
  };

  useEffect(() =>
  {
    if (portraitModeError) {
      setErrorDivClass("portrait-mode-error");
      setControlClass("controls hidden");
    }
    else {
      setErrorDivClass("portrait-mode-error" + " hidden");
      setControlClass("controls");
    }
  }, [portraitModeError])


  return (
    <>
      <header>
        <ControllerTopBar />
      </header>

      <main>
        <div className={errorDivClass}>
          <h2>Vous pouvez uniquement utilisé l'application en mode paysage</h2>
        </div>

        <div className={controlClass}>
          <div className="steer-control">
            <button className="ctrl">⮜</button>
            <button className="ctrl">⮞</button>
          </div>

          <div className="speedometer">
          </div>

          <div className="power-control">
            <button className="ctrl">⮝</button>
            <button className="ctrl">⮟</button>
          </div>
        </div>
      </main>
    </>
  );
}