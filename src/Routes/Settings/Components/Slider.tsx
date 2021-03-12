import { nanoid } from "nanoid";
import React from "react";
import "./SettingComponents.scss";

export interface SettingSliderProps {
  min: number | string;
  max: number | string;
  default: number | string;
  step?: number | string;

  label: string;
  unit?: string;
  onValueChange: (value: number) => void;
}

export function SettingSlider(props: SettingSliderProps) {
  const [value, setValue] = React.useState(props.default);

  return (
    <div className="setting-component-group">
      <p className="label">{props.label}</p>
      <input type="range" defaultValue={props.default} min={props.min} max={props.max}
        onInput={onInputChange} step={props.step ?? ""} />
      <p className="unit">{`${value}${" " + (props.unit ?? "")}`}</p>
    </div>
  );

  function onInputChange(e: React.FormEvent<HTMLInputElement>) {
    //@ts-ignore
    const newVal = e.target.value;
      
    setValue(newVal);
    props.onValueChange(newVal);
  }
}