import React, { useEffect, useState } from "react";
import Speedometer, { CustomSegmentLabelPosition } from "react-d3-speedometer";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
import { getScreenOrientation } from "../../Utils/getOrientation";
import "./Drive.scss";
// import ReactNipple from "react-nipple";

enum GearSpeed {
  Gear1 = 40,
  Gear2 = 70,
  Gear3 = 85,
  Gear4 = 100,
  Gear5 = 140
};

export function Drive() {

  const terminationEvent = 'onpagehide' in window ? 'pagehide' : 'unload';
  document.addEventListener(terminationEvent, (event) => { }, { capture: true });

  document.title = "Conduire";

  // wait for the page to load before mounting joystick x
  const SPEEDOMER_SIZE = window.screen.availHeight / 1.8;
  const maxSpeed = parseInt(window.localStorage.getItem("max-engine-power") ?? "CONTROL_TIMEOUT_DURATION");

  const [portraitModeError, setPortraitModeError] = useState(getScreenOrientation() == "landscape" ? false : true);
  const [errorDivClass, setErrorDivClass] = useState("portrait-mode-error");
  const [controlClass, setControlClass] = useState<string>("");
  const [RPM, setRPM] = useState(0);
  const getRPMText = () => `${RPM} rpm`;
  /* left button */
  const [leftButtonClass, setLeftButtonClass] = useState("ctrl");
  const [leftButtonIntervalID, setLeftButtonIntervalID] = useState<NodeJS.Timeout>();
  const [leftButtonIsBeingHeld, setLeftButtonHeld] = useState(false);
  /* right button */
  const [rightButtonClass, setRightButtonClass] = useState("ctrl");
  const [rightButtonIntervalID, setRightButtonIntervalID] = useState<NodeJS.Timeout>();
  const [rightButtonIsBeingHeld, setRightButtonHeld] = useState(false);
  /* up button */
  const [upButtonClass, setUpButtonClass] = useState("ctrl");
  const [upButtonIntervalID, setUpButtonIntervalID] = useState<NodeJS.Timeout>();
  const [upButtonIsBeingHeld, setUpButtonHeld] = useState(false);
  /* down button */
  const [downButtonClass, setDownButtonClass] = useState("ctrl");
  const [downButtonIntervalID, setDownButtonIntervalID] = useState<NodeJS.Timeout>();
  const [downButtonIsBeingHeld, setDownButtonHeld] = useState(false);

  let timeoutDuration = 80;

  let didReachedMax;

  useEffect(() => {

    // avoid rpm being too low
    if (RPM < 0)
      setRPM(0);
    else if (RPM > 1000)
      setRPM(1000);

    //setCurrentRPMText(`RPM: ${RPM}`);
  }, [RPM]);

  window.onorientationchange = function () {
    const newState = getScreenOrientation() == "landscape" ? false : true;
    setPortraitModeError(newState);
  };

  useEffect(() => {
    if (portraitModeError) {
      setErrorDivClass("portrait-mode-error");
      setControlClass("controls hidden");
    }
    else {
      setErrorDivClass("portrait-mode-error" + " hidden");
      setControlClass("controls");
    }
  }, [portraitModeError]);

  useEffect(() => {
    console.log({downButtonIsBeingHeld, upButtonIsBeingHeld, leftButtonIsBeingHeld, rightButtonIsBeingHeld})
    if (!downButtonIsBeingHeld && !upButtonIsBeingHeld && !leftButtonIsBeingHeld && !rightButtonIsBeingHeld) {
      const interval = setInterval(() => {
        if (RPM <= 0) {
          setRPM(0);
          clearInterval(interval as unknown as number);
        }
        else {
          if (RPM - 1 != -1)
            setRPM((RPM) => --RPM);
        }
      }, 40);
    }
  }, [downButtonIsBeingHeld, upButtonIsBeingHeld, leftButtonIsBeingHeld, rightButtonIsBeingHeld]);

  // left button
  function onLeftBtnHold() {
    if (leftButtonIsBeingHeld)
      return;

    setLeftButtonHeld(true);
    setLeftButtonClass("ctrl key-down");
    setLeftButtonIntervalID(setInterval(() => {
      console.log("pog");
    }, timeoutDuration));
  }

  function onLeftBtnRelease() {
    setLeftButtonHeld(false);
    setLeftButtonClass("ctrl");
    clearInterval(leftButtonIntervalID as unknown as number ?? NaN);
  }

  // right button
  function onRightBtnHold() {
    if (rightButtonIsBeingHeld)
      return;

    setRightButtonHeld(true);
    setRightButtonClass("ctrl key-down");
    setRightButtonIntervalID(setInterval(() => {
      console.log("pog");
    }, timeoutDuration));
  }

  function onRightBtnRelease() {
    setRightButtonHeld(false);
    setRightButtonClass("ctrl");
    clearInterval(rightButtonIntervalID as unknown as number ?? NaN);
  }

  // up button
  let speed = 0;
  const INTERVAL_TIME = 50;
  const RPM_TO_DEC = 10;
  const RPM_TO_INC = 10;

  function onUpBtnHold() {
    if (!upButtonIsBeingHeld) {
      setUpButtonHeld(true);
      setUpButtonClass("ctrl key-down");
      let value = 0;
      setUpButtonIntervalID(setInterval(() => {
        setRPM((RPM) => RPM + RPM_TO_INC);
        console.debug("Changed RPM: ", RPM);
      }, INTERVAL_TIME));
    }
  }

  function onUpBtnRelease() {
    setUpButtonHeld(false);
    setUpButtonClass("ctrl");
    clearInterval(upButtonIntervalID as unknown as number ?? NaN);
  }

  // Down button
  function onDownBtnHold() {
    if (!downButtonIsBeingHeld) {
      setDownButtonHeld(true);
      setDownButtonClass("ctrl key-down");
      setDownButtonIntervalID(setInterval(() => {
        setRPM((RPM) => RPM - RPM_TO_DEC);
      }, INTERVAL_TIME));
    }
  }

  function onDownBtnRelease() {
    setDownButtonHeld(false);
    setDownButtonClass("ctrl");
    clearInterval(downButtonIntervalID as unknown as number ?? NaN);
  }


  const fontSize = "1.6em";
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
            <button className={leftButtonClass} onMouseDown={onLeftBtnHold}
              onPointerLeave={onLeftBtnRelease} onContextMenu={(e) => e.preventDefault()}>⮜</button>
            <button className={rightButtonClass} onMouseDown={onRightBtnHold}
              onPointerLeave={onRightBtnRelease} onContextMenu={(e) => e.preventDefault()}>⮞</button>
          </div>

          <div className="speedometer">
            <Speedometer
              // sizing
              height={SPEEDOMER_SIZE} width={SPEEDOMER_SIZE}
              // Colors
              needleColor="grey" textColor="#fff"
              // Variables
              value={RPM} currentValueText={getRPMText()}
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
              minValue={0}
            />
          </div>

          <div className="power-control">
            <button className={upButtonClass} onMouseDown={onUpBtnHold} onPointerLeave={onUpBtnRelease}>⮝</button>
            <button className={downButtonClass} onMouseDown={onDownBtnHold} onPointerLeave={onDownBtnRelease}>⮟</button>
          </div>
        </div>
      </main>
    </>
  );
}

function getIntervalDureation(rpm: number): GearSpeed {
  if (rpm <= 200)
    return GearSpeed.Gear1;
  else if (rpm <= 400)
    return GearSpeed.Gear2;
  else if (rpm <= 600)
    return GearSpeed.Gear3;
  else if (rpm <= 800)
    return GearSpeed.Gear4;
  else if (rpm <= 1000)
    return GearSpeed.Gear5;
  else
    throw new Error("Unexpected interval duration for RPM \"" + rpm + "\"");
}