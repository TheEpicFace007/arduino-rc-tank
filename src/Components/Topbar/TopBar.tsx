import { TabProps } from "@material-ui/core";
import React from "react";
import { getScreenOrientation, ScreenOrientation } from "../../ScreenApi";
import BlankTopBarItem from "./BlankTopBarItem";
import "./TopBar.scss"

export interface TopBarProp
{
  children: JSX.Element[];
}

export function TopBar(props: TopBarProp)
{
  const screenSize = getScreenOrientation();
  if (props.children.length < 3)
  {

  }
  return (
    <div className="top-bar">
      {props.children}
    </div>
  );
}
