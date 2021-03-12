import React from "react";
import "./SettingComponents.scss";

export interface SettingPageProps
{
  name: string;
  children: JSX.Element | JSX.Element[];
}

export function SettingPage(props: SettingPageProps)
{
  return (
    <div className="setting-page">
      <h2>{props.name}</h2>
      {props.children}
    </div>
  );
}