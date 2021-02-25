import React from 'react';
import { MenuButton, MainMenuButtonState } from "../../Components/Menu/MenuButton";
import { Menu } from "../../Components/Menu/Menu"
import "./MainMenu.scss"

export default function MainMenu()
{
  document.title = "Menu principale";
  return (
    <>
      <h1 id="title">Tank 9000 dashboard</h1>
      <Menu />
    </>
  );
}