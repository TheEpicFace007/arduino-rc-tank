import React from "react";
import BlankTopBarItem from "./BlankTopBarItem";
import "./TopBar.scss"
import { TopBarButton } from "./TopBarButton";

export interface TopBarProp
{
  children: JSX.Element[];
}

export function TopBar(props: TopBarProp)
{
 
  return (
    <div className="top-bar">
      <TopBarButton name="Menu principal" onClick={() => window.location.pathname = "/"} icon="home" />
      <BlankTopBarItem />
      {props.children}
    </div>
  );
}
