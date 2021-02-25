import React, { useState } from "react";
import "./Settings.scss";
import { TopBar } from "../../Components/Topbar/TopBar";
import { ControllerTopBar, ControllerTopBarItem } from "../../Components/Topbar/ControllerTopBar";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleLeft, faHome, faWrench } from "@fortawesome/free-solid-svg-icons";
import { TopBarButton } from "../../Components/Topbar/TopBarButton";


export function Settings()
{
  const [activeSettingPage, setActiveSettingPage] = useState<string>();
  const [previousActiveSettingPage, setPreviousSettingPage] = useState<string>();

  const SettingTopBarItem: ControllerTopBarItem[] = [
    { name: "Menu principale", icon: "home", onClick: () => window.location.pathname = "/" },
    {
      name: "Retour", icon: "arrow-circle-left", onClick: () =>
      {
        setActiveSettingPage(previousActiveSettingPage);
      }
    },
    {
      name: "Puissance du moteur", icon: "wrench", onClick: () =>
      {

      }
    }
  ];

  library.add(faHome, faArrowCircleLeft, faWrench);

  return (
    <>
      <header>
        <TopBar>
          {SettingTopBarItem.map((setting) => <TopBarButton key={setting.name} onClick={setting.onClick}
            name={setting.name} icon={setting.icon} />)}
        </TopBar>
      </header>
      
      <main>

      </main>
    </>
  );
}