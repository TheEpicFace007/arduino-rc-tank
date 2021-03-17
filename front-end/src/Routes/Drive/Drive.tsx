import React, { useEffect, useState } from "react";
import Speedometer, { CustomSegmentLabelPosition, Transition } from "react-d3-speedometer";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { ControllerTopBar } from "../../Components/Topbar/ControllerTopBar";
import { getScreenOrientation } from "../../Utils/getOrientation";
import "./Drive.scss";
// import ReactNipple from "react-nipple";

enum GearSpeed {
  Gear1 = 30,
  Gear2 = 40,
  Gear3 = 50,
  Gear4 = 60,
  Gear5 = 70
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
  const [leftButtonIsBeingHeld, setLeftButtonHeld] = useState<boolean>(false);
  /* right button */
  const [rightButtonClass, setRightButtonClass] = useState("ctrl");
  const [rightButtonIntervalID, setRightButtonIntervalID] = useState<NodeJS.Timeout>();
  const [rightButtonIsBeingHeld, setRightButtonHeld] = useState<boolean>(false);
  /* up button */
  const [upButtonClass, setUpButtonClass] = useState("ctrl");
  const [upButtonIntervalID, setUpButtonIntervalID] = useState<NodeJS.Timeout>();
  const [upButtonIsBeingHeld, setUpButtonHeld] = useState<boolean>(false);
  /* down button */
  const [downButtonClass, setDownButtonClass] = useState("ctrl");
  const [downButtonIntervalID, setDownButtonIntervalID] = useState<NodeJS.Timeout>();
  const [downButtonIsBeingHeld, setDownButtonHeld] = useState<boolean>(false);

  const getNeedleSpeed = () => getIntervalDureation(RPM);


  let didReachedMax;

  useEffect(() => {

    // avoid rpm being too low
    if (RPM < 0) {
      setRPM(0);

    }
    else if (RPM > 1000) {
      setRPM(1000);
    }
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

  // left button
  function onLeftBtnHold() {
    if (!leftButtonIsBeingHeld) {
      setLeftButtonHeld(true);
      setLeftButtonClass("ctrl key-down");
      setLeftButtonIntervalID(setInterval(() => {
        console.log("left button is being held");
      }, 20));
    }
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
    }, 20));
  }

  function onRightBtnRelease() {
    setRightButtonHeld(false);
    setRightButtonClass("ctrl");
    clearInterval(rightButtonIntervalID as unknown as number ?? NaN);
  }

  // up button
  let speed = 0;
  // const getNeedleSpeed() = 50;
  const RPM_TO_DEC = 10;
  const RPM_TO_INC = 10;

  function onUpBtnHold() {
    if (!upButtonIsBeingHeld) {
      setUpButtonHeld(true);
      setUpButtonClass("ctrl key-down");
      let value = 0;
      setUpButtonIntervalID(setInterval(() => {
        setRPM((RPM) => RPM + RPM_TO_INC);
        //console.debug("Changed RPM: ", RPM);
      }, getNeedleSpeed()));
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
      }, getNeedleSpeed()));
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
          <h2>Vous pouvez uniquement utiliser l'application en mode paysage</h2>
        </div>

        <div className={controlClass}>
          <div className="steer-control">
            <button className={leftButtonClass} onTouchStart={onLeftBtnHold} onTouchEnd={onLeftBtnRelease}>
              ⮜
            </button>
            <button className={rightButtonClass} onTouchStart={onRightBtnHold} onTouchEnd={onRightBtnRelease}>
              ⮞
            </button>
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
              needleTransitionDuration={getNeedleSpeed()} needleTransition={Transition.easeSinInOut}
            />
          </div>

          <div className="power-control">
            <button className={upButtonClass} onTouchStart={onUpBtnHold}  onTouchEnd={onUpBtnRelease}>
              ⮝
            </button>
            <button className={downButtonClass} onTouchStart={onDownBtnHold} onTouchEnd={onDownBtnRelease}>
              ⮟
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function getIntervalDureation(rpm: number): number {
  return parseInt(window.localStorage.getItem("accel-speed") ?? "50")
  /* if (rpm <= 200)
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
    return GearSpeed.Gear5; */
}

async function syncTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
