import React from "react";
import { TopBar } from "./TopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopBarButton, TopBarButtonAlignment } from "./TopBarButton";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleDown, faArrowCircleLeft, faHome } from "@fortawesome/free-solid-svg-icons";

export type ControllerTopBarItem = {
  name: string,
  icon: IconProp,
  onClick: () => void;
};
interface ControllerTopBarProps {
  children?: JSX.Element | JSX.Element[];
  notice?: string;
}

library.add(faArrowCircleLeft, faHome);

export function ControllerTopBar() {
  const CONTROLLER_TOP_BAR_ITEMS: ControllerTopBarItem[] =
    [
      // { name: "Retour", icon: "arrow-circle-left", onClick: () => window.history.back() },
      // { name: "Menu principal", icon: "home", onClick: () => window.location.pathname = "/" }
    ];

  return (
    <>
      <TopBar>
        {CONTROLLER_TOP_BAR_ITEMS.map((item) => <TopBarButton name={item.name} icon={item.icon}
          key={item.name} onClick={item.onClick} />)}
      </TopBar>
    </>
  );
}