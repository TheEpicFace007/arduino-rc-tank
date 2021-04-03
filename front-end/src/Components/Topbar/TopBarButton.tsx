import React from "react";
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import "./TopBar.scss"
import { library } from '@fortawesome/fontawesome-svg-core';

export type TopBarButtonAlignment = "middle" | "left" | "right";
export interface TopBarButtonProps
{
  name: string;
  icon: IconProp;
  color?: string;
  onClick: () => void;
}

export function TopBarButton(props: TopBarButtonProps)
{
  return (
    <div className={`top-bar-btn`} onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} style={{color: props.color, cursor: "pointer"}} size="2x" />
      <p>{props.name}</p>
    </div>
  );
}