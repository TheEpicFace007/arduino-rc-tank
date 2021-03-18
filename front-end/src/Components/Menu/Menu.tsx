import React, { useState } from "react";
import "./Menu.scss";
import { MenuButton, MainMenuButtonState } from "./MenuButton";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { library, } from '@fortawesome/fontawesome-svg-core';
import { faCar, faHome, faTools } from "@fortawesome/free-solid-svg-icons";
import PwaInstallPoup from "../PwaInstallPopup/PwaInstallPopup";

library.add(faCar, faHome, faTools);

export type MenuState = { name: ButtonTitle, isSelected: boolean; icon: JSX.Element; disabled?: boolean; className?: string; };

export type ButtonTitle = "Installer l'app" | "Conduire" | "Réglage";

export function Menu() {
  let isAppInstalled;
  if (window.matchMedia('(display-mode: standalone)'))
    isAppInstalled = true;
  else
    isAppInstalled = false;
  const MAIN_MENU_BUTTON: MenuState[] =
    [
      { name: "Installer l'app", isSelected: false, icon: <FontAwesomeIcon icon="home" size="4x" />, className: "install-btn" },
      { name: "Conduire", isSelected: false, icon: <FontAwesomeIcon icon="car" size="4x" /> },
      { name: "Réglage", isSelected: false, icon: <FontAwesomeIcon icon="tools" size="4x" /> }
    ];
  switch (document.location.pathname) {
    case "/":
      // MAIN_MENU_BUTTON[0].isSelected = true;
      break;
    case "/drive":
      MAIN_MENU_BUTTON[1].isSelected = true;
      break;
    case "/setting":
      MAIN_MENU_BUTTON[2].isSelected = true;
      break;
  }

  const [showInstallPopup, setShowInstallPopup] = useState(false);


  function onButtonClick(button: ButtonTitle): void {
    switch (button) {
      case "Installer l'app":
        alert("Connnecte-toi aux données cellulaires ou a un WI-FI autre que celui de l'Arduino pour voir le tutoriel sur comment installer l'appli");
        window.open("https://mobilesyrup.com/2020/05/24/how-install-progressive-web-app-pwa-android-ios-pc-mac", undefined,
                    "blabla, height=480, width=640, resizable=off"); // osti que chu lazy tabarnack
        break;
      case "Conduire":
        if (document.location.pathname == "/drive")
          break;
        document.location.pathname = "/drive";
        break;
      case "Réglage":
        if (document.location.pathname == "/reglage")
          break;
        document.location.pathname = "/reglage";
        break;
    }
  }

  return (
    <>
      <div className="dimmed">
        <div className="menu">
          {MAIN_MENU_BUTTON.map((state) => <MenuButton name={state.name} onClick={(b) => onButtonClick(b as ButtonTitle)}
            isSelected={state.isSelected} icon={state.icon} key={state.name} />)}
        </div>
      </div>
      
    </>
  );
}