import React from "react";
import "./Menu.scss";
import { MenuButton, MainMenuButtonState } from "./MenuButton";
import
  {
    TuneTwoTone, LocalTaxiTwoTone, HomeTwoTone
  } from "@material-ui/icons";

export type MenuState =
  [
    { name: "Home", isSelected: boolean; icon: JSX.Element; },
    { name: "Conduire", isSelected: boolean; icon: JSX.Element; },
    { name: "Réglage", isSelected: boolean; icon: JSX.Element; }
  ];

export function Menu()
{
  const MAIN_MENU_BUTTON: MenuState =
    [
      { name: "Home", isSelected: false, icon: <HomeTwoTone /> },
      { name: "Conduire", isSelected: false, icon: <LocalTaxiTwoTone /> },
      { name: "Réglage", isSelected: false, icon: <TuneTwoTone /> }
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

  function onButtonClick(button: string): void
  {
    switch (button) {
      case "Home":
        if (document.location.pathname == button)
          break;
        document.location.pathname = "/";
        break;
      case "Conduire":
        if (document.location.pathname == button)
          break;
        document.location.pathname = "/drive";
        break;
      case "Réglage":
        if (document.location.pathname == button)
          break;
        document.location.pathname = "/setting";
        break;
    }
  }

  return (
    <div className="dimmed">
      <div className="menu">
        {MAIN_MENU_BUTTON.map((state) => <MenuButton name={state.name} onClick={onButtonClick}
          isSelected={state.isSelected} icon={state.icon} key={state.name} />)}
      </div>
    </div>
  );
}