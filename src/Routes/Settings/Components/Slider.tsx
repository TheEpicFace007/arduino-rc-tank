import { nanoid } from "nanoid";
import React from "react";
import "./SettingComponents.scss"

export interface SettingSliderProps
{
  min: number | string;
  max: number | string;
  default: number | string;
  step?: number;

  label: string;
  unit?: string;
  onValueChange: (value: number) => void;
}

export function SettingSlider(props: SettingSliderProps)
{
  const [value, setValue] = React.useState(props.default);
  const sliderId = nanoid();
  
  return (
    <div className="setting-component-group">
      <p>{props.label}</p>
      <input type="range" defaultValue={props.default} id={sliderId} min={props.min} max={props.max} 
      onInput={onInputChange} step={props.step ?? ""}/>
      <p>{`${value}${" " + (props.unit ?? "")}`}</p>
    </div>
  );

  function onInputChange(e: React.FormEvent<HTMLInputElement>)
  {
    const target = e.target;
    //@ts-ignore
    setValue(e.target.value)
    console.log(value);
  }
}