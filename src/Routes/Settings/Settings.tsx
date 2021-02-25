import React, { useState } from "react";
import "./Settings.scss";
import { TopBar } from "../../Components/Topbar/TopBar";
import { ControllerTopBar, ControllerTopBarItem } from "../../Components/Topbar/ControllerTopBar";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleLeft, faHome, faWrench } from "@fortawesome/free-solid-svg-icons";
import { TopBarButton } from "../../Components/Topbar/TopBarButton";
import { compilation } from "webpack";

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
        setPreviousSettingPage(activeSettingPage);
        setActiveSettingPage(previousActiveSettingPage);
      }
    },
    {
      name: "Puissance du moteur", icon: "wrench", onClick: () => 
      {
        setPreviousSettingPage(activeSettingPage);
        setActiveSettingPage("power-setting");
      }
    }
  ];

  let toRender: JSX.Element;
  switch (activeSettingPage) {
    case "home":
      toRender = (
        <div className="setting-page-intro">
          <p style={{fontSize: "30px"}}>Selectionne une des catégorie de paramèttres.</p>
        </div>
      );
      break;
    case "power-setting":
      toRender = (
        <div className="power-setting setting-page">
          
        </div>
      );
      break;
  }

  return (
    <>
      <header>
        <TopBar>
          {SettingTopBarItem.map((setting) =>
            <TopBarButton key={setting.name} onClick={setting.onClick}
              name={setting.name} icon={setting.icon} />)}
        </TopBar>
      </header>

      <main>
        {toRender}
      </main>
    </>
  );
}