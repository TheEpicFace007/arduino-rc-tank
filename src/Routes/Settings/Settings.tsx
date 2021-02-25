import React, { useState } from "react";
import "./Settings.scss";
import { TopBar } from "../../Components/Topbar/TopBar";
import { ControllerTopBar, ControllerTopBarItem } from "../../Components/Topbar/ControllerTopBar";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleLeft, faHome, faWrench } from "@fortawesome/free-solid-svg-icons";
import { TopBarButton } from "../../Components/Topbar/TopBarButton";
import { compilation } from "webpack";
import { SettingSlider } from "./Components/Slider";
import { SettingPage } from "./Components/SettingPage";

type SettingPage = "power-setting" | "home";
library.add(faHome, faArrowCircleLeft, faWrench);

export function Settings()
{
  const [activeSettingPage, setActiveSettingPage] = useState<SettingPage>("home");
  const [previousActiveSettingPage, setPreviousSettingPage] = useState<SettingPage>("home");

  const SettingTopBarItem: ControllerTopBarItem[] = [
    {
      name: "Retour", icon: "arrow-circle-left", onClick: () =>
      {
        if (activeSettingPage != "home") {
          setPreviousSettingPage(activeSettingPage);
          setActiveSettingPage(previousActiveSettingPage);
        }
      }
    },
    {
      name: "Puissance du moteur", icon: "wrench", onClick: () => 
      {
        if (activeSettingPage != "power-setting") {
          setPreviousSettingPage(activeSettingPage);
          setActiveSettingPage("power-setting");
        }
      }
    }
  ];

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
          <SettingSlider default={0} min={0} max={100} step="5" unit="%" label="Puissences des moteurs" onValueChange={onPowerChange} />
        </SettingPage>
      );
      break;
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

  function onPowerChange(power: number)
  {
    console.log(power);
  }

  function onLeftEngineChange(change: number)
  {}

  function onRightEngineChange(change: number)
  {

  }
}