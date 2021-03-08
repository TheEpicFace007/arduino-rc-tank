import React, { useState, useEffect, useRef } from "react";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
// import ReactNipple from "react-nipple";
import "./Drive.scss";
import { getScreenOrientation } from "../../Utils/getOrientation";
import Speedometer, { CustomSegmentLabelPosition } from "react-d3-speedometer";

export function Drive()
{
  // wait for the page to load before mounting joystick x
  const SPEEDOMER_SIZE = window.screen.height / 1.8;
  document.title = "Conduire";

  const [portraitModeError, setPortraitModeError] = useState(getScreenOrientation() == "landscape" ? false : true);
  const [errorDivClass, setErrorDivClass] = useState("portrait-mode-error");
  const [controlClass, setControlClass] = useState<string>("");
  const [RPM, setRPM] = useState(0);
  const [currentValueText, setCurrentValueText] = useState(`RPM: ${RPM}`);
  useEffect(() =>
  {
    setCurrentValueText(`RPM: ${RPM}`)
  }, [RPM])

  window.onorientationchange = function ()
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
  }, [portraitModeError]);


  const fontSize = "1.6em"
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
            <Speedometer
              // sizing
              height={SPEEDOMER_SIZE} width={SPEEDOMER_SIZE}
              // Colors
              needleColor="grey" textColor="#fff"
              // Variables
              value={RPM} currentValueText={currentValueText}
              customSegmentLabels={[
                {
                  color: "#B5BEC6",
                  text: "1",
                  fontSize,
                  position: CustomSegmentLabelPosition.Inside
                },
                {
                  color: "#B5BEC6",
                  text: "2",
                  fontSize,
                  position: CustomSegmentLabelPosition.Inside
                },
                {
                  color: "#B5BEC6",
                  text: "3",
                  fontSize,
                  position: CustomSegmentLabelPosition.Inside
                },
                {
                  color: "#B5BEC6",
                  text: "4",
                  fontSize,
                  position: CustomSegmentLabelPosition.Inside
                },
                {
                  color: "#B5BEC6",
                  text: "5",
                  fontSize,
                  position: CustomSegmentLabelPosition.Inside
                },
              ]}
              segmentColors={["#414B4F", "#505C61", "#627178", "#6F8087", "#7D9199"]}
            />
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