import React, { useEffect, useState } from "react";
import Speedometer, { CustomSegmentLabelPosition, Transition } from "react-d3-speedometer";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { ControllerTopBar, ControllerTopBarItem } from "../../Components/Topbar/ControllerTopBar";
import { getScreenOrientation } from "../../Utils/getOrientation";
import { SocketHelper } from "../../SocketHelper";
import { TopBarButton } from "../../Components/Topbar/TopBarButton";
import { TopBar } from "../../Components/Topbar/TopBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretSquareDown, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { kMaxLength } from "buffer";
// import ReactNipple from "react-nipple";

enum GearSpeed {
  Gear1 = 30,
  Gear2 = 40,
  Gear3 = 50,
  Gear4 = 60,
  Gear5 = 70
};

export function Drive() {
  import("./Drive.scss");
  const terminationEvent = 'onpagehide' in window ? 'pagehide' : 'unload';
  document.addEventListener(terminationEvent, (event) => { }, { capture: true });
  document.title = "Conduire";

  // wait for the page to load before mounting joystick x
  const maxSpeed = (parseInt(window.localStorage.getItem("max-engine-power") ?? "CONTROL_TIMEOUT_DURATION")) * 10;
  console.log(maxSpeed)

  const [showPortraitModeError, setShowPortraitModeError] = useState(getScreenOrientation() == "landscape" ? false : true);
  const [errorDivClass, setErrorDivClass] = useState("portrait-mode-error");
  const [controlClass, setControlClass] = useState<string>("");
  const [RPM, setRPM] = useState(0);
  const getRPMText = () => `${RPM} rpm`;
  /* left button */
  const [leftButtonClass, setLeftButtonClass] = useState("ctrl no-select");
  const [leftButtonIntervalID, setLeftButtonIntervalID] = useState<NodeJS.Timeout>();
  const [leftButtonIsBeingHeld, setLeftButtonHeld] = useState<boolean>(false);
  /* right button */
  const [rightButtonClass, setRightButtonClass] = useState("ctrl no-select");
  const [rightButtonIntervalID, setRightButtonIntervalID] = useState<NodeJS.Timeout>();
  const [rightButtonIsBeingHeld, setRightButtonHeld] = useState<boolean>(false);
  /* up button */
  const [upButtonClass, setUpButtonClass] = useState("ctrl no-select");
  const [upButtonIntervalID, setUpButtonIntervalID] = useState<NodeJS.Timeout>();
  const [upButtonIsBeingHeld, setUpButtonHeld] = useState<boolean>(false);
  /* down button */
  const [downButtonClass, setDownButtonClass] = useState("ctrl no-select");
  const [downButtonIntervalID, setDownButtonIntervalID] = useState<NodeJS.Timeout>();
  const [downButtonIsBeingHeld, setDownButtonHeld] = useState<boolean>(false);

  const [cruiseControlEnabled, setCruiseControlEnable] = useState(false);
  const [cruiseControlIconColor, setCruiseControlColor] = useState("#a1a1a1")

  const [reverseEnabled, setReverseEnabled] = useState(false)
  const [reverseIconColor, setReverseIconColor] = useState("#a1a1a1");

  const reverseSpeed = parseInt(localStorage.getItem("reverse-speed") ?? "50") ?? 50;

  useEffect(() => {
    if (cruiseControlEnabled) {
      setCruiseControlColor("#fff")
    }
    else {
      setCruiseControlColor("#a1a1a1")
    }
  }, [cruiseControlEnabled])

  useEffect(() => {
    if (reverseEnabled) {
      setReverseIconColor("#fff")
    }
    else {
      setReverseIconColor("#a1a1a1")
    }
  }, [reverseEnabled])

  const getNeedleSpeed = () => getIntervalDureation(RPM);
  const noButtonAreBeingHeld = () => !upButtonIntervalID && !leftButtonIsBeingHeld && !rightButtonIsBeingHeld && !downButtonIntervalID;

  setTimeout(() => {
    document.querySelectorAll("*").forEach(e => e.classList.add("no-select"))
  }, 250);
  let didReachedMax;

  useEffect(() => {

    // avoid rpm being too low
    if (RPM < 0) {
      setRPM(0);

    }
    else if (RPM > 1000) {
      setRPM(1000);
    }
    else if (RPM > maxSpeed) {
      setRPM(maxSpeed)
    }
    //setCurrentRPMText(`RPM: ${RPM}`);
  }, [RPM]);

  window.onorientationchange = function () {
    const newOrientation = getScreenOrientation();
    if (newOrientation === "landscape")
      setShowPortraitModeError(false);
    else
      setShowPortraitModeError(true);

    console.log(newOrientation)
  };

  useEffect(() => {
    if (showPortraitModeError) {
      setErrorDivClass("portrait-mode-error");
      setControlClass("controls hidden");
    }
    else {
      setErrorDivClass("portrait-mode-error" + " hidden");
      setControlClass("controls");
    }
  }, [showPortraitModeError]);

  // adjust screen size
  const width = window.screen.availWidth
  let protoSpeedoSize = 250
  /* if (width <= 568) 
    protoSpeedoSize = 180
  else if (width <= 667)
    protoSpeedoSize = 230
  else if (width <= 640)
    protoSpeedoSize = 250;
  else if (width <= 736)
    protoSpeedoSize = 325
  else if (width <= 812)
    protoSpeedoSize = 320;
  else if (width <= 1200)
    protoSpeedoSize = 400
  else if (width <= 1400)
    protoSpeedoSize = 500
  else */
    protoSpeedoSize = width / 2.75
  
  const [speedometerSize, setSpeedometerSize] = useState(protoSpeedoSize)
  

  // left button
  function onLeftBtnHold() {
    if (!leftButtonIsBeingHeld) {
      setLeftButtonHeld(true);
      setLeftButtonClass("ctrl no-select key-down");
      setLeftButtonIntervalID(setInterval(() => {
        console.log("left button is being held");
      }, 20));
    }
  }

  function onLeftBtnRelease() {
    setLeftButtonHeld(false);
    setLeftButtonClass("ctrl no-select");
    clearInterval(leftButtonIntervalID as unknown as number ?? NaN);
  }

  // right buttonπ
  function onRightBtnHold() {
    if (rightButtonIsBeingHeld)
      return;

    setRightButtonHeld(true);
    setRightButtonClass("ctrl no-select key-down");
    setRightButtonIntervalID(setInterval(() => {
      console.log("pog");
    }, 20));
  }

  function onRightBtnRelease() {
    setRightButtonHeld(false);
    setRightButtonClass("ctrl no-select");
    clearInterval(rightButtonIntervalID as unknown as number ?? NaN);
  }

  // up button
  let speed = 0;
  // const getNeedleSpeed() = 50;
  const RPM_TO_DEC = reverseSpeed;
  const RPM_TO_INC = getNeedleSpeed();

  function onUpBtnHold() {
    if (!upButtonIsBeingHeld) {
      setUpButtonHeld(true);
      setUpButtonClass("ctrl no-select key-down");
      let value = 0;
      setUpButtonIntervalID(setInterval(() => {
        setRPM((RPM) => RPM + 20);
        //console.debug("Changed RPM: ", RPM);
      }, getNeedleSpeed()));
    }
  }

  function onUpBtnRelease() {
    setUpButtonHeld(false);
    setUpButtonClass("ctrl no-select");
    clearInterval(upButtonIntervalID as unknown as number ?? NaN);
  }

  // Down button
  function onDownBtnHold() {
    if (!downButtonIsBeingHeld) {
      setDownButtonHeld(true);
      setDownButtonClass("ctrl no-select key-down");
      setDownButtonIntervalID(setInterval(() => {
        setRPM((RPM) => RPM - 20);
      }, RPM_TO_DEC));
      setCruiseControlEnable(false);
    }
  }

  function onDownBtnRelease() {
    setDownButtonHeld(false);
    setDownButtonClass("ctrl no-select");
    clearInterval(downButtonIntervalID as unknown as number ?? NaN);
    setCruiseControlEnable(false);

  }
  // if ()
  // document.requestFullscreen'
  library.add(faTachometerAlt, faCaretSquareDown)
 /*  const CONTROLLER_TOP_BAR_ITEMS: ControllerTopBarItem[] =
    [
      { icon: "tachometer-alt", name: "Cruise control", onClick: () => setCruiseControlEnable(!cruiseControlEnabled), color: cruiseControlIconColor, key: "cruise-control" },
      { icon: "caret-square-down", name: "Reverse", onClick: () => setReverseEnabled(!reverseEnabled), color: reverseIconColor, key: "reverse-car" }
    ]; */


  const fontSize = "1.6em";
  return (
    <>
      <header>
        <TopBar>
            <TopBarButton
              name="Cruise control"
              icon="tachometer-alt"
              key="cruise control"
              onClick={() => setCruiseControlEnable(!cruiseControlEnabled)}
              color={cruiseControlIconColor}
            />
          <TopBarButton
            name="Reverse"
            icon="caret-square-down"
            onClick={() => setReverseEnabled(!reverseEnabled)}
            color={reverseIconColor}
            key="reverse car button"
          />
        </TopBar>
      </header>

      <main>
        <div className={errorDivClass}>
          <h2>Vous pouvez uniquement utiliser l'application en mode paysage</h2>
        </div>

        <div className={controlClass}>
          <div className="steer-control">
            <button unselectable="on" className={leftButtonClass} onTouchStart={onLeftBtnHold} onTouchEnd={onLeftBtnRelease}>
              &lArr;
            </button>
            <button unselectable="on" className={rightButtonClass} onTouchStart={onRightBtnHold} onTouchEnd={onRightBtnRelease}>
              &rArr;
            </button>
          </div>

          <div className="speedometer no-select">
            <Speedometer
              // sizing
              height={speedometerSize} width={speedometerSize} dimensionUnit="px"
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
              key="speedometer"
            />

            {/* <p className="no-select">{getRPMText()}</p> */}
          </div>

          <div className="power-control">
            <button unselectable="on" className={upButtonClass} onTouchStart={onUpBtnHold} onTouchEnd={onUpBtnRelease}>
              &uArr;
            </button>
            <button unselectable="on" className={downButtonClass} onTouchStart={onDownBtnHold} onTouchEnd={onDownBtnRelease}>
              &dArr;
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
