import { TabProps } from "@material-ui/core";
import React from "react";
import { getScreenOrientation, ScreenOrientation } from "../../Utils/ScreenApi";
import BlankTopBarItem from "./BlankTopBarItem";
import "./TopBar.scss"
import { TopBarButton } from "./TopBarButton";

export interface TopBarProp
{
  children: JSX.Element[];
}

export function TopBar(props: TopBarProp)
{
  const screenSize = getScreenOrientation();
 
  return (
    <div className="top-bar">
      <TopBarButton name="Menu principale" onClick={() => window.location.pathname = "/"} icon="home" />
      <BlankTopBarItem />
      {props.children}
    </div>
  );
}
