import React, { useState } from "react";
import "./Settings.scss";
import { TopBar } from "../../Components/Topbar/TopBar";
import { ControllerTopBar, ControllerTopBarItem } from "../../Components/Topbar/ControllerTopBar";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleLeft, faEllipsisH, faHome, faWrench } from "@fortawesome/free-solid-svg-icons";
import { TopBarButton } from "../../Components/Topbar/TopBarButton";
import { compilation } from "webpack";
import { SettingSlider } from "./Components/Slider";
import { SettingPage } from "./Components/SettingPage";
import { SettingButtons } from "./Components/Buttons";

type SettingPage = "power-setting" | "home" | "autre";

export function Settings() {
  library.add(faHome, faArrowCircleLeft, faWrench, faEllipsisH);
  document.title = "Réglages";
  const terminationEvent = 'onpagehide' in window ? 'pagehide' : 'unload';
  document.addEventListener(terminationEvent, (event) => { }, { capture: true });

  const [activeSettingPage, setActiveSettingPage] = useState<SettingPage>("home");
  const [previousActiveSettingPage, setPreviousSettingPage] = useState<SettingPage>("home");

  const SettingTopBarItem: ControllerTopBarItem[] = [
    {
      name: "Retour", icon: "arrow-circle-left", onClick: () => {
        if (activeSettingPage != "home") {
          setPreviousSettingPage(activeSettingPage);
          setActiveSettingPage(previousActiveSettingPage);
        }
      }
    },
    {
      name: "Puissance du moteur", icon: "wrench", onClick: () => {
        if (activeSettingPage != "power-setting") {
          setPreviousSettingPage(activeSettingPage);
          setActiveSettingPage("power-setting");
        }
      }
    },
    {
      name: "Autre", icon: "ellipsis-h", onClick: () => {
        setPreviousSettingPage(activeSettingPage);
        setActiveSettingPage("autre")
      }
    }
  ];

  let maxPower: number = parseInt(window.localStorage.getItem("max-engine-power") ?? "100") ?? 100;
  let turnSpeed: number = parseInt(window.localStorage.getItem("turn-speed") ?? "20") ?? 20;
  let accelSpeed = parseInt(window.localStorage.getItem("accel-speed") ?? "50") ?? 50;

  const onPowerChange = (power: number) => maxPower = power;
  const onTurnSpeedChange = (speed: number) => turnSpeed = speed;
  const onAccelSpeedChange = (speed: number) => accelSpeed = speed;

  function onSaveEngineSettings(): void {
    window.localStorage.setItem("max-engine-power", maxPower.toString());
    window.localStorage.setItem("turn-speed", turnSpeed.toString());
    window.localStorage.setItem("accel-speed", accelSpeed.toString());
  }

  let toRender: JSX.Element;

  switch (activeSettingPage) {
    case "home":
      toRender = (
        <div className="setting-page-intro">
          <h2 style={{ fontSize: "29x" }}>Selectionne une des catégorie de paramèttres.</h2>
        </div>
      );
      break;
    case "power-setting":
      toRender = (
        <SettingPage name="Puissences des moteurs" key="puissences-des-moteurs">
          <SettingSlider default={maxPower} min={0} max={100} step="5" unit="%" label="Puissences des moteurs" onValueChange={onPowerChange} />
          <SettingSlider default={turnSpeed} min={5} max={50} unit="ms" label="Vitesse a laquel le véhicule va tourné" onValueChange={onTurnSpeedChange} />
          <SettingSlider default={accelSpeed} step="5" min={5} max={250} unit="ms" label="Vitesse d'accélération" onValueChange={onAccelSpeedChange}/>
          <SettingButtons name="Appliqué les changements" onClick={() => onSaveEngineSettings()} />
        </SettingPage>
      );
      break;
    case "autre":
      toRender = (
        <SettingPage name="Autre" key="autre">
          <SettingButtons name="Rénitialize toute les reglages" onClick={() => {
            if (window.confirm("Etes vous sure de vouloir rénitallisé tout les paramètres?")) {
              window.localStorage.clear();
              alert("Rénitialization des reglage fait avec sucesst!")
              window.location.reload();
            }
          }} />
        </SettingPage>
      );

      break;
    default:
      throw new Error(`Unexpected active page or forgot to implement setting page "${activeSettingPage}"`);
  }

  return (
    <>
      <header>
        <TopBar>
          {SettingTopBarItem.map((setting) => <TopBarButton key={setting.name} onClick={setting.onClick} name={setting.name} icon={setting.icon} />)}
        </TopBar>
      </header>

      <main>
        {toRender}
      </main>
    </>
  );
}