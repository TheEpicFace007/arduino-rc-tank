import "./Menu.scss";

export interface MainMenuButtonProps
{
  name: string;
  onClick: (b: string) => void;
  isSelected: boolean;
  icon: JSX.Element;
  disabled?: boolean;
  className?: string;
};

export type MainMenuButtonState = {
  name: string;
  isSelected: boolean;
  icon: JSX.Element;
};

export function MenuButton(props: MainMenuButtonProps)
{
  return (
    <div className="menu-btn">
      <div className={`main-menu-button${props.isSelected ? " " + "btn-selected" : ""} ${props.disabled == true ? "disabled" : ""} ${props.className ?? ""}`}
        onClick={() => props.onClick(props.name)}>
        {props.icon}
        <h3>{props.name}</h3>
      </div>
    </div>
  );
}