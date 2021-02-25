import React from "react";
import "./Menu.scss";
import { MenuButton, MainMenuButtonState } from "./MenuButton";
import
  {
    TuneTwoTone, LocalTaxiTwoTone, HomeTwoTone
  } from "@material-ui/icons";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { library,  } from '@fortawesome/fontawesome-svg-core';
import { faCar, faHome, faTools } from "@fortawesome/free-solid-svg-icons";

library.add(faCar, faHome, faTools);

export type MenuState =
  [
    { name: "Acceuil", isSelected: boolean; icon: JSX.Element; },
    { name: "Conduire", isSelected: boolean; icon: JSX.Element; },
    { name: "Réglage", isSelected: boolean; icon: JSX.Element; }
  ];

export type button_title =  "Acceuil" | "Conduire" | "Réglage";

export function Menu()
{
  const MAIN_MENU_BUTTON: MenuState =
    [
      { name: "Acceuil", isSelected: false, icon: <FontAwesomeIcon icon="home" size="4x" /> },
      { name: "Conduire", isSelected: false, icon: <FontAwesomeIcon icon="car" size="4x" /> },
      { name: "Réglage", isSelected: false, icon: <FontAwesomeIcon icon="tools" size="4x" /> }
    ];
  switch (document.location.pathname) {
    case "/":
      MAIN_MENU_BUTTON[0].isSelected = true;
      break;
    case "/drive":
      MAIN_MENU_BUTTON[1].isSelected = true;
      break;
    case "/setting":
      MAIN_MENU_BUTTON[2].isSelected = true;
      break;
  }

  function onButtonClick(button: button_title & string): void
  {
    switch (button) {
      case "Acceuil":
        if (document.location.pathname == "/")
          break;
        document.location.pathname = "/";
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
    <div className="dimmed">
      <div className="menu">
        {/* @ts-ignore*/}
        {MAIN_MENU_BUTTON.map((state) => <MenuButton name={state.name} onClick={(b) => onButtonClick(b)}
          isSelected={state.isSelected} icon={state.icon} key={state.name} />)}
      </div>
    </div>
  );
}