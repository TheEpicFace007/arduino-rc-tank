import React from "react";
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TopBar.scss"

export type TopBarButtonAlignment = "middle" | "left" | "right";
export interface TopBarButtonProps
{
  name: string;
  icon: IconProp;
  onClick: () => void;
}

export function TopBarButton(props: TopBarButtonProps)
{
  return (
    <div className={`top-bar-btn`}>
      <FontAwesomeIcon icon={props.icon} color="white" size="2x" onClick={props.onClick}/>
      <p>{props.name}</p>
    </div>
  );
}