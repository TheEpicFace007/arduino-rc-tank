import React from "react";

export interface SettingButtonProps
{
  name: string;
  onClick: () => void;
}

export function SettingButtons(props: SettingButtonProps)
{
  return (
    <div className="setting-component-group">
      {/* <p className="label">{props.name}</p> */}
      <input type="button" onClick={props.onClick} value={props.name} />
    </div>
  )
}