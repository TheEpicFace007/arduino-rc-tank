import React, { useState, useEffect } from "react";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
// import ReactNipple from "react-nipple";
import "./Drive.scss";
import { RpmGauge } from "../../Components/RpmGauge/RpmGauge"
import { getScreenOrientation } from "../../Utils/getOrientation";


export function Drive()
{
  // wait for the page to load before mounting joystick x
  document.title = "Conduire";
  const [portraitModeError, setPortraitModeError] = useState(getScreenOrientation() == "landscape" ? false : true);
  const [errorDivClass, setErrorDivClass] = useState("portrait-mode-error");
  const [rpmGaugeClass, setRPMGaugeClass] = useState<string>();

  window.onorientationchange = function()
  {
    const newState = getScreenOrientation() == "landscape" ? false : true;
    setPortraitModeError(newState);
  };

  useEffect(() =>
  {
    if (portraitModeError) {
      setErrorDivClass("portrait-mode-error");
      setRPMGaugeClass("hidden");
    }
    else {
      setErrorDivClass("portrait-mode-error" + " hidden");
      setRPMGaugeClass("");
    }
  }, [portraitModeError])


  return (
    <>
      <header>
        <ControllerTopBar />
      </header>

      <main>
        <div className={errorDivClass}>
          <h1>Vous pouvez uniquement utilisé l'application en mode paysage</h1>
        </div>
        <RpmGauge className={rpmGaugeClass ?? ""} />
      </main>
    </>
  );
}